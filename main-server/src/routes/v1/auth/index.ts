import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import AuthService, { LoginBody, RegisterBody } from './authService';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post(
    '/login',
    async (req: FastifyRequest<{ Body: LoginBody }>, res) => {
      return AuthService.login(req, res);
    }
  );
  fastify.post(
    '/register',
    async (req: FastifyRequest<{ Body: RegisterBody }>, res) => {
      return AuthService.register(req, res);
    }
  );

  done();
};

export default authRoute;
