import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import { ContextType } from '@src/utils/graphql';
import { setCookie } from '@src/utils/setCookie';
import { decode, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { DecodedUserAccessToken, DecodedUserRefreshToken } from '../isLoggedIn';

export function IsLoggedIn(throwError: boolean): MiddlewareFn<ContextType> {
  return async ({ context: { req, res, cookies } }, next) => {
    const { accessToken, qid } = cookies;

    if (!accessToken || !qid) {
      if (throwError) {
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

      return next();
    } catch (err) {
      const { user_id, token_id, exp } = decode(qid) as DecodedUserRefreshToken;

      const user = await User.findOne(user_id);

      if (!user) {
        if (throwError) {
          throw new CustomError({
            type: ErrorType.BAD_REQUEST,
            message: 'Refresh token or access token not found',
          });
        }
        return false;
      }

      const { accessToken, refreshToken } = user.refreshToken(
        token_id,
        exp,
        qid
      );

      setCookie(res, 'access_token', accessToken);
      setCookie(res, 'qid', refreshToken);

      req.userId = user_id;

      return next();
    }
  };
}
