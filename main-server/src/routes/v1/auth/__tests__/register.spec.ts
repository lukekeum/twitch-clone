import { instance } from '@src/utils/tests/setup';
import generateUserObject from '@src/utils/generateUserObject';
import AuthService from '../authService';

describe('POST /v1/auth/register', () => {
  const user = generateUserObject();
  const dupUser = generateUserObject();

  beforeAll(async () => {
    await AuthService.addUser(dupUser);
  });

  it('Email or Identifier user duplicated', async () => {
    const { email, identifier } = dupUser;

    const responseEmail = await instance.inject({
      method: 'POST',
      url: '/v1/auth/register',
      payload: {
        ...user,
        email,
      },
    });

    const responseIdentifier = await instance.inject({
      method: 'POST',
      url: '/v1/auth/register',
      payload: {
        ...user,
        identifier,
      },
    });

    const errMessage = JSON.stringify({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Email or identifier already exists',
    });

    expect(responseEmail.statusCode).toBe(400);
    expect(responseIdentifier.statusCode).toBe(400);
    expect(responseEmail.body).toBe(errMessage);
    expect(responseIdentifier.body).toBe(errMessage);
  });

  it('Register user successfully', async () => {
    const { email, password, identifier, nickname } = user;

    const response = await instance.inject({
      method: 'POST',
      url: '/v1/auth/register',
      payload: {
        email,
        password,
        identifier,
        nickname,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(JSON.stringify({ message: 'Registered' }));
  });
});
