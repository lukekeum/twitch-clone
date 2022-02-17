import { User } from '@src/entities/user.entity';
import generateUserObject from '@src/utils/generateUserObject';
import { instance } from '@src/utils/tests/setup';
import AuthService from '../authService';

describe('POST /v1/auth/logout', () => {
  const user = generateUserObject();
  let tokens = {};

  beforeAll(async () => {
    const { user: usr } = await AuthService.addUser(user);
    tokens = await usr.generateTokens();
  });

  afterAll(async () => {
    await User.delete({ email: user.email });
  });

  it('Tokens are not exists', async () => {
    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/logout',
      cookies: {},
    });

    expect(response.statusCode).toBe(400);
  });

  it('Logout user', async () => {
    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/logout',
      cookies: {
        qid: (tokens as any).refreshToken,
        access_token: (tokens as any).accessToken,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(JSON.stringify({ message: 'Logged out' }));
    expect(response.headers['set-cookie']).toBeDefined();
  });
});
