import { StreamSetting } from '@src/entities/streamSetting.entity';
import { StreamSettingService } from './streamSetting.service';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { ContextType } from '@src/utils/graphql';
import {
  Args,
  Ctx,
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
  constructor(public streamSettingService: StreamSettingService) {}

  @FieldResolver(() => String)
  async streamURL(@Root() setting: StreamSetting) {
    const userId = setting.fk_user_id;

    return this.streamSettingService.getStreamURL(userId);
  }

  @UseMiddleware([IsLoggedIn(true)])
  @Mutation(() => Boolean)
  async generateToken() {
    return;
  }

  @UseMiddleware([IsLoggedIn(true)])
  @Mutation(() => Boolean)
  async setBroadcastSettings(
    @Args() input: BroadcastSettingArgs,
    @Ctx() { req }: ContextType
  ) {
    const result = await this.streamSettingService.changeSettings(
      req.userId,
      input
    );
    if (!result) return false;
    return true;
  }
}
