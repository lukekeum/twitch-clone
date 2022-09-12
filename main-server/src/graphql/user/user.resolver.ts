import { User } from '@src/entities/user.entity';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { ContextType } from '@src/utils/graphql';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class UserResolver {
  @UseMiddleware([IsLoggedIn(true)])
  @Query(() => User)
  me(@Ctx() { req }: ContextType) {
    const user = User.findOne(req.userId);

    return user;
  }
}
