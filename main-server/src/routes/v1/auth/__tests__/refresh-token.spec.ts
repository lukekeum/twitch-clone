import { User } from '@src/entities/user.entity';
import { instance } from '@src/utils/tests/setup';
import generateUserObject from '@src/utils/generateUserObject';
import AuthService from '../authService';

describe('POST /v1/auth/refresh-token', () => {
  const user = generateUserObject();
  let tokens = {};

  beforeAll(async () => {
    const { user: usr, userProfile } = await AuthService.addUser(user);
    tokens = await usr.generateTokens();
  });

  afterAll(async () => {
    await User.delete({ email: user.email });
  });

  it('Refresh token not exists', async () => {
    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/refresh-token',
      cookies: {},
    });

    expect(response.statusCode).toBe(400);
  });

  it('Refresh token', async () => {
    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/refresh-token',
      cookies: {
        qid: (tokens as any).refreshToken,
        access_token: (tokens as any).accessToken,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(JSON.stringify({ message: 'Refreshed' }));
  });
});
