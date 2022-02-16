import faker from 'faker';
import AuthService from '../authService';
import { instance } from '@src/utils/tests/setup';

describe('POST /v1/auth/login', () => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    identifier: faker.internet.userName(),
    nickname: faker.internet.userName(),
  };

  beforeAll(async () => {
    await AuthService.addUser(user);
  });

  it('Email user not found', async () => {
    const { password } = user;

    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/login',
      payload: {
        email: 'WRONG EMAIL',
        password,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  it('Password incorrect', async () => {
    const { email } = user;

    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/login',
      payload: {
        email,
        password: 'WRONG PASSWORD',
      },
    });

    expect(response.statusCode).toBe(401);
  });

  it('Correct email and password', async () => {
    const { email, password } = user;

    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/login',
      payload: {
        email,
        password,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(JSON.stringify({ message: 'Logged in' }));
    expect(response.headers).toHaveProperty('set-cookie');
  });
});
