import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { setCookie } from '@src/utils/setCookie';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { decode, verify } from 'jsonwebtoken';
import fp from 'fastify-plugin';
import { ResponseMessage } from '@src/utils/errors/responseMessage';

export interface DecodedUserAccessToken {
  user_id: string;
  exp: number;
}

export interface DecodedUserRefreshToken extends DecodedUserAccessToken {
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
  fastify.addHook(
    'preHandler',
    async (req: FastifyRequest, res: FastifyReply) => {
      const { access_token: accessToken, qid } = req.cookies;

      if (!accessToken || !qid) {
        if (opts.throwError) {
          throw new CustomError({
            type: ErrorType.UNAUTHORIZED,
            message: ResponseMessage.SHOULD_LOGIN,
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
        const { user_id, token_id, exp } = decode(
          qid
        ) as DecodedUserRefreshToken;

        const user = await User.findOne(user_id);

        if (!user) {
          if (opts.throwError) {
            throw new CustomError({
              type: ErrorType.BAD_REQUEST,
              message: ResponseMessage.TOKEN_NOT_FOUND,
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
    }
  );

  done();
};

export default fp(isLoggedInHook);
