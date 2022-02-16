import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import AuthService, { LoginBody } from './authService';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post(
    '/login',
    async (req: FastifyRequest<{ Body: LoginBody }>, res) => {
      return AuthService.login(req, res);
    }
  );
  fastify.post('/register', async (req, res) => {
    return AuthService.register(req, res);
  });

  done();
};

export default authRoute;
