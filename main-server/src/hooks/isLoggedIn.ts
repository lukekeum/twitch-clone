import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import { setCookie } from '@src/utils/setCookie';
import { FastifyPluginCallback } from 'fastify';
import { decode, verify } from 'jsonwebtoken';
import fp from 'fastify-plugin';

interface DecodedUserAccessToken {
  user_id: string;
  exp: number;
}

interface DecodedUserRefreshToken extends DecodedUserAccessToken {
  token_id: string;
}

interface PluginConfig {
  throwError: boolean;
}

const isLoggedInHook: FastifyPluginCallback<PluginConfig> = (
  fastify,
  opts,
  done
) => {
  fastify.addHook('preHandler', async (req, res) => {
    const { access_token: accessToken, qid } = req.cookies;

    if (!accessToken || !qid) {
      if (opts.throwError) {
        throw new CustomError({
          type: ErrorType.UNAUTHORIZED,
          message: 'You must be logged in to use this api',
        });
      }
      return;
    }

    try {
      const decodedAccessToken = verify(
        accessToken,
        process.env.ACCESS_JWT_SECRET
      ) as DecodedUserAccessToken;

      req.userId = decodedAccessToken.user_id;

      return req;
    } catch (err) {
      const { user_id, token_id, exp } = decode(qid) as DecodedUserRefreshToken;

      const user = await User.findOne(user_id);

      if (!user) {
        if (opts.throwError) {
          throw new CustomError({
            type: ErrorType.BAD_REQUEST,
            message: 'Refresh token or access token not found',
          });
        }
        return;
      }

      const { accessToken, refreshToken } = user.refreshToken(
        token_id,
        exp,
        qid
      );

      setCookie(res, 'access_token', accessToken);
      setCookie(res, 'qid', refreshToken);

      req.userId = user_id;

      return;
    }
  });

  done();
};

export default fp(isLoggedInHook);

declare module 'fastify' {
  interface FastifyRequest {
    userId: string;
  }
}
