import { Follow } from '@src/entities/follow.entity';
import { User } from '@src/entities/user.entity';

export class FollowController {
  public static async followUser(
    userId: string,
    targetId: string
  ): Promise<boolean> {
    try {
      const user = await User.findOne({ identifier: userId });
      const target = await User.findOne({ identifier: targetId });

      const checkFollow = await Follow.findOne({
        where: {
          follower: user?.id,
          following: target?.id,
        },
      });

      let isFollowed = false;

      if (checkFollow) {
        isFollowed = true;
      }

      console.log('isFollowed: ', isFollowed);

      if (isFollowed) {
        await Follow.delete({ id: checkFollow?.id });
      } else {
        await Follow.create({
          follower: user,
          following: target,
        }).save();
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
