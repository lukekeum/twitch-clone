import { Follow } from '@src/entities/follow.entity';
import { User, UserAuthTokens } from '@src/entities/user.entity';
import generateUserObject from '@src/utils/generateUserObject';
import TestUtils from '@src/utils/tests/utils.class';
import { gql } from 'apollo-server-fastify';

describe('MUTATE followUser', () => {
  const user = generateUserObject();
  const target = generateUserObject();
  const req = {};
  const res = {};

  const MUTATION = gql`
    mutation ($id: String!) {
      followUser(targetId: $id)
    }
  `;

  let tokens: UserAuthTokens = {
    accessToken: '',
    refreshToken: '',
  };

  let usr: { user: User };
  let targetUsr: { user: User };

  beforeAll(async () => {
    usr = await TestUtils.addUser(user);
    targetUsr = await TestUtils.addUser(target);

    tokens = await usr.user.generateTokens();
  });

  afterAll(async () => {
    await TestUtils.removeUserByEmail(user.email);
    await TestUtils.removeUserByEmail(target.email);
  });

  it('Cookie not found', async () => {
    const { mutate } = TestUtils.getGraphqlTestingTool({
      context: () => ({
        req,
        res,
        cookies: {
          accessToken: '',
          qid: '',
        },
      }),
    });

    const { errors } = await mutate({
      mutation: MUTATION,
      variables: { id: target.identifier },
    });

    expect(errors).toBeDefined();
  });

  it('Target identifier is equal to user', async () => {
    const { mutate } = TestUtils.getGraphqlTestingTool({
      context: () => ({
        req,
        res,
        cookies: {
          accessToken: tokens.accessToken,
          qid: tokens.refreshToken,
        },
      }),
    });

    const { errors } = await mutate({
      mutation: MUTATION,
      variables: { id: usr.user.identifier },
    });

    expect(errors).toBeDefined();
  });

  it('Valid cookie and input', async () => {
    const { mutate } = TestUtils.getGraphqlTestingTool({
      context: () => ({
        req,
        res,
        cookies: {
          accessToken: tokens.accessToken,
          qid: tokens.refreshToken,
        },
      }),
    });

    const { data, errors } = await mutate({
      mutation: MUTATION,
      variables: { id: target.identifier },
    });

    expect(data.followUser).toBe(true);
    expect(errors).toBeUndefined();

    const follow = await Follow.findOne({
      where: {
        follower: { id: usr.user.id },
        following: { id: targetUsr.user.id },
      },
      relations: ['follower', 'following'],
    });

    expect(follow).toBeDefined();
  });
});
