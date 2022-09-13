import { User } from '@src/entities/user.entity';
import generateUserObject from '@src/utils/generateUserObject';
import TestUtils from '@src/utils/tests/utils.class';
import { gql } from 'apollo-server-fastify';

describe('QUERY getUserByIdentifier', () => {
  const user = generateUserObject();

  const QUERY = gql`
    query ($id: String!) {
      getUserByIdentifier(identifier: $id) {
        id
      }
    }
  `;

  let usr: { user: User };

  beforeAll(async () => {
    usr = await TestUtils.addUser(user);
  });

  afterAll(async () => {
    await TestUtils.removeUserByEmail(user.email);
  });

  it('Search user by identifier', async () => {
    const { query } = TestUtils.getGraphqlTestingTool();

    const { data, errors } = await query({
      query: QUERY,
      variables: { id: usr.user.identifier },
    });

    expect(data?.getUserByIdentifier.id).toBe(usr.user.id);
    expect(errors).toBeUndefined();
  });
});
