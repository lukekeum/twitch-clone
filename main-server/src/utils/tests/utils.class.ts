import { StreamSetting } from '@src/entities/streamSetting.entity';
import { User } from '@src/entities/user.entity';
import { UserProfile } from '@src/entities/userProfile.entity';
import { Config, ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import getGraphqlServerOptions from '../graphql';

interface AddUserPayload {
  email: string;
  password: string;
  identifier: string;
  nickname: string;
}

export default class TestUtils {
  static async addUser(payload: AddUserPayload) {
    const { email, password, identifier, nickname } = payload;

    const user = await User.create({ email, password, identifier }).save();
    const userProfile = await UserProfile.create({
      nickname,
      fk_user_id: user.id,
    }).save();
    const streamSetting = await StreamSetting.create({
      fk_user_id: user.id,
    }).save();

    return { user, userProfile, streamSetting };
  }

  static async removeUserByEmail(email: string) {
    await User.delete({ email });
    return true;
  }

  static getGraphqlTestingTool(config: Config = {}) {
    const serverOptions = getGraphqlServerOptions();

    serverOptions.context = { req: {}, res: {} };

    const server = new ApolloServer({
      ...(serverOptions as any),
      ...config,
    });

    const { query, mutate } = createTestClient(server);

    return { query, mutate };
  }
}
