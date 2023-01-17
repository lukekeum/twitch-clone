import { User } from '@src/entities/user.entity';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';
import { ContextType } from '@src/utils/graphql';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { FollowService } from './follow.service';

@Resolver()
export class FollowResolver {
  @UseMiddleware([IsLoggedIn(true)])
  @Mutation(() => Boolean, {
    defaultValue: false,
    description:
      'Follow user if user not followed, Unfollow user if user followed',
  })
  async followUser(
    @Ctx() { req }: ContextType,
    @Arg('targetId', () => String) identifier: string
  ) {
    const usrId = req.userId;

    const user = await User.findOne({ id: usrId });

    if (user?.identifier === identifier || !user) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: ResponseMessage.INVALID_INPUT,
      });
    }

    const result = await FollowService.followUser(user.identifier, identifier);

    return result;
  }

  @Mutation(() => Boolean, {
    defaultValue: false,
    description: 'Forcing follow/unfollow user (Admin only)',
  })
  async followForceUser(
    @Arg('userId', () => String, { description: "user's identifier" })
    usrId: string,
    @Arg('targetId', () => String, { description: "target's identifier" })
    targetId: string
  ) {
    if (usrId === targetId) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: ResponseMessage.INVALID_INPUT,
      });
    }

    const result = await FollowService.followUser(usrId, targetId);

    return result;
  }
}
