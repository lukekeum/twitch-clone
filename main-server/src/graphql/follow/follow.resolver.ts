import { Follow } from '@src/entities/follow.entity';
import { User } from '@src/entities/user.entity';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { ContextType } from '@src/utils/graphql';
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { In } from 'typeorm';

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
    return true;
  }

  @Query(() => Int, { defaultValue: 0 })
  async getFolowerCount(@Arg('identifier', () => String) identifier: string) {
    return 0;
  }

  @Query(() => Int, { defaultValue: 0 })
  async getFollowingCount(@Arg('identifier', () => String) identifier: string) {
    return 0;
  }
}
