import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';
import { ContextType } from '@src/utils/graphql';
import { MiddlewareFn } from 'type-graphql';

export function IsAdmin(throwError: boolean): MiddlewareFn<ContextType> {
  return async ({ context: { req } }, next) => {
    const { userId } = req;

    if (!userId) {
      if (throwError) {
        throw new CustomError({
          type: ErrorType.UNAUTHORIZED,
          message: ResponseMessage.SHOULD_LOGIN,
        });
      }
      return;
    }

    const user = await User.findOne(userId);

    if (!user) {
      if (throwError) {
        throw new CustomError({
          type: ErrorType.BAD_REQUEST,
          message: ResponseMessage.SHOULD_LOGIN,
        });
      }
    }
  };
}
