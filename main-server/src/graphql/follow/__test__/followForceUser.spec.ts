import { Follow } from '@src/entities/follow.entity';
import { User } from '@src/entities/user.entity';
import generateUserObject from '@src/utils/generateUserObject';
import TestUtils from '@src/utils/tests/utils.class';
import { gql } from 'apollo-server-fastify';

describe('MUTATE followForceUser', () => {
  const user = generateUserObject();
  const target = generateUserObject();
  const req = {};
  const res = {};

  const MUTATION = gql`
    mutation ($usrId: String!, $targetId: String!) {
      followForceUser(userId: $usrId, targetId: $targetId)
    }
  `;

  let usr: { user: User };
  let targetUsr: { user: User };

  beforeAll(async () => {
    usr = await TestUtils.addUser(user);
    targetUsr = await TestUtils.addUser(target);
  });

  afterAll(async () => {
    await TestUtils.removeUserByEmail(user.email);
    await TestUtils.removeUserByEmail(target.email);
  });

  it('Target identifier is equal to user', async () => {
    const { mutate } = TestUtils.getGraphqlTestingTool({
      context: () => ({
        req,
        res,
      }),
    });

    const { errors } = await mutate({
      mutation: MUTATION,
      variables: { usrId: user.identifier, targetId: user.identifier },
    });

    expect(errors).toBeDefined();
  });

  it('Follow force user succeed', async () => {
    const { mutate } = TestUtils.getGraphqlTestingTool({
      context: () => ({
        req,
        res,
      }),
    });

    const { data, errors } = await mutate({
      mutation: MUTATION,
      variables: { usrId: user.identifier, targetId: target.identifier },
    });

    expect(data.followForceUser).toBe(true);
    expect(errors).toBeUndefined();

    const follow = await Follow.findOne({
      where: {
        follower: usr.user.id,
        following: targetUsr.user.id,
      },
      relations: ['follower', 'following'],
    });

    expect(follow).toBeDefined();
  });
});
