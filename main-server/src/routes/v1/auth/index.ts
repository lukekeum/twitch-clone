import isLoggedIn from '@src/hooks/isLoggedIn';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import AuthService, { LoginBody, RegisterBody } from './authService';
import LoginValidationJSON from './validation/login.validation.json';
import RegisterValidationJSON from './validation/register.validation.json';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post(
    '/login',
    LoginValidationJSON,
    async (req: FastifyRequest<{ Body: LoginBody }>, res: FastifyReply) => {
      return AuthService.login(req, res);
    }
  );
  fastify.post(
    '/register',
    RegisterValidationJSON,
    async (req: FastifyRequest<{ Body: RegisterBody }>, res: FastifyReply) => {
      return AuthService.register(req, res);
    }
  );

  fastify.post(
    '/refresh-token',
    async (req: FastifyRequest, res: FastifyReply) => {
      return AuthService.refreshToken(req, res);
    }
  );

  fastify.register(logoutRoute, { prefix: '/' });

  done();
};

const logoutRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(isLoggedIn, { throwError: false });
  fastify.post('/logout', async (req: FastifyRequest, res: FastifyReply) => {
    return AuthService.logout(req, res);
  });

  done();
};

export default authRoute;
