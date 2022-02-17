import isLoggedIn from '@src/hooks/isLoggedIn';
import fastify, { FastifyPluginCallback, FastifyRequest } from 'fastify';
import AuthService, { LoginBody, RegisterBody } from './authService';
import LoginValidationJSON from './validation/login.validation.json';
import RegisterValidationJSON from './validation/register.validation.json';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post(
    '/login',
    LoginValidationJSON,
    async (req: FastifyRequest<{ Body: LoginBody }>, res) => {
      return AuthService.login(req, res);
    }
  );
  fastify.post(
    '/register',
    RegisterValidationJSON,
    async (req: FastifyRequest<{ Body: RegisterBody }>, res) => {
      return AuthService.register(req, res);
    }
  );

  fastify.post('/refresh-token', async (req: FastifyRequest, res) => {
    return AuthService.refreshToken(req, res);
  });

  fastify.register(logoutRoute, { prefix: '/' });

  done();
};

const logoutRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(isLoggedIn, { throwError: false });
  fastify.post('/logout', async (req, res) => {
    return AuthService.logout(req, res);
  });

  done();
};

export default authRoute;
