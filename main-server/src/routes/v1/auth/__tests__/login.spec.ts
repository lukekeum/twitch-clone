import AuthService from '../authService';
import { instance } from '@src/utils/tests/setup';
import { User } from '@src/entities/user.entity';
import generateUserObject from '@src/utils/generateUserObject';

describe('POST /v1/auth/login', () => {
  const user = generateUserObject();

  beforeAll(async () => {
    await AuthService.addUser(user);
  });

  afterAll(async () => {
    await User.delete({ email: user.email });
  });

  it('Email user not found', async () => {
    const { password } = user;

    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/login',
      payload: {
        email: 'WRONGEMAIL@gmail.com',
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
