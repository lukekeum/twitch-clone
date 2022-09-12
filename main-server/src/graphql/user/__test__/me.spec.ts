import { User, UserAuthTokens } from '@src/entities/user.entity';
import generateUserObject from '@src/utils/generateUserObject';
import TestUtils from '@src/utils/tests/utils.class';
import { gql } from 'apollo-server-fastify';

describe('QUERY me', () => {
  const user = generateUserObject();
  const req = {};
  const res = {};

  const QUERY = gql`
    query {
      me {
        id
      }
    }
  `;

  let tokens: UserAuthTokens = {
    accessToken: '',
    refreshToken: '',
  };

  let usr: { user: User };

  beforeAll(async () => {
    usr = await TestUtils.addUser(user);

    tokens = await usr.user.generateTokens();
  });

  afterAll(async () => {
    await TestUtils.removeUserByEmail(user.email);
  });

  it('Cookie not found', async () => {
    const { query } = TestUtils.getGraphqlTestingTool({
      context: ({ request, reply }) => ({
        req,
        res,
        cookies: {
          accessToken: '',
          qid: '',
        },
      }),
    });

    const { errors } = await query({ query: QUERY });

    expect(errors![0].message).toBe('You must be logged in to use this api');
  });

  it('Cookie is valid', async () => {
    const { query } = TestUtils.getGraphqlTestingTool({
      context: ({ request, reply }) => ({
        req,
        res,
        cookies: {
          accessToken: tokens.accessToken,
          qid: tokens.refreshToken,
        },
      }),
    });

    const { data, errors } = await query({ query: QUERY });

    expect(data.me.id).toBe(usr.user.id);
    expect(errors).toBeUndefined();
  });
});
