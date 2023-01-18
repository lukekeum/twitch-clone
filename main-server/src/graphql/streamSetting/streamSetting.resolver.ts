import { StreamSetting } from '@src/entities/streamSetting.entity';
import { User } from '@src/entities/user.entity';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import {
  Args,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Service } from 'typedi';
import { BroadcastSettingArgs } from './streamSetting.input';

@Service()
@Resolver(() => StreamSetting)
export class StreamSettingResolver {
  @FieldResolver(() => String)
  async streamURL(@Root() setting: StreamSetting) {
    const user = await User.findOne({
      where: { id: setting?.fk_user_id },
    });

    if (!user) return;

    return `${process.env.PROXY_ADDRESS}/live/${user.identifier}`;
  }

  @UseMiddleware([IsLoggedIn(true)])
  @Mutation(() => Boolean)
  async generateToken() {
    return;
  }

  @UseMiddleware([IsLoggedIn(true)])
  @Mutation(() => Boolean)
  async setBroadcastSettings(@Args() input: BroadcastSettingArgs) {
    return false;
  }
}
