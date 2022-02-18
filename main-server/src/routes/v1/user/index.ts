import isLoggedIn from '@src/hooks/isLoggedIn';
import UserService from './userService';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authenticateRoute, { prefix: '/' });
  fastify.get(
    '/is-streaming',
    async (req: FastifyRequest<{ Querystring: { id: string } }>, res) => {
      const { id } = req.query;

      if (!id) return {};

      return UserService.isStreaming(id);
    }
  );

  done();
};

const authenticateRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(isLoggedIn, { throwError: true });
  fastify.get('/me', async (req, res) => {
    return UserService.me(req, res);
  });

  done();
};

export default userRoute;
