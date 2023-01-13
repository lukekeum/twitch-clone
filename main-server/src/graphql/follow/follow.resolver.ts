import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import { ContextType } from '@src/utils/graphql';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { FollowController } from './follow.controller';

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

    if (usrId === identifier) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: 'User identifier and target identifier should be different',
      });
    }

    const result = await FollowController.followUser(req.userId, identifier);

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
        message: 'User identifier and target identifier should be different',
      });
    }

    const result = await FollowController.followUser(usrId, targetId);

    return result;
  }
}
