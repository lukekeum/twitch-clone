import DataLoader from 'dataloader';
import { Follow } from '@src/entities/follow.entity';
import { User } from '@src/entities/user.entity';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { ContextType } from '@src/utils/graphql';
import { groupBy } from 'lodash';
import {
  Arg,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { In } from 'typeorm';
import fetch from 'node-fetch';

@Resolver(() => User)
export class UserResolver {
  @UseMiddleware([IsLoggedIn(true)])
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: ContextType): Promise<User | undefined> {
    const user = await User.findOne(req.userId);

    return user;
  }

  @Query(() => User, { nullable: true })
  async getUserByIdentifier(
    @Arg('identifier', () => String) identifier: string
  ) {
    const user = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.userProfile', 'userProfile')
      .leftJoinAndSelect('user.streamSetting', 'streamSetting')
      .where('user.identifier = :id', { id: identifier })
      .getOne();

    return user;
  }

  @FieldResolver(() => Boolean, { defaultValue: false })
  async isStreaming(@Root() user: User) {
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${process.env.PROXY_ADDRESS}/live/${user.identifier}`
      );

      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  @FieldResolver(() => [Follow], { nullable: true })
  @Loader<string, Follow[]>(
    async (ids) => {
      const followers = await Follow.find({
        where: { follower: { id: In([...ids]) } },
        relations: ['follower', 'following', 'following.userProfile'],
      });
      const followersById = groupBy(followers, 'follower.id');
      return ids.map((id) => followersById[id] ?? []);
    },
    { cache: false }
  )
  followers(@Root() user: User) {
    return (dataloader: DataLoader<string, Follow[]>) =>
      dataloader.load(user.id);
  }

  @FieldResolver(() => [Follow], { nullable: true })
  @Loader<string, Follow[]>(
    async (ids) => {
      const followings = await Follow.find({
        where: { following: { id: In([...ids]) } },
        relations: ['follower', 'follower.userProfile', 'following'],
      });
      const followingsById = groupBy(followings, 'following.id');
      return ids.map((id) => followingsById[id] ?? []);
    },
    { cache: false }
  )
  followings(@Root() user: User) {
    return (dataloader: DataLoader<string, Follow[]>) =>
      dataloader.load(user.id);
  }
}
