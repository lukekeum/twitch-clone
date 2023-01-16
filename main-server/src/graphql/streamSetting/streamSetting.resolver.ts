import { StreamSetting } from '@src/entities/streamSetting.entity';
import { User } from '@src/entities/user.entity';
import { FieldResolver, Mutation, Resolver, Root } from 'type-graphql';

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
}
