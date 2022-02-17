import isLoggedIn from '@src/hooks/isLoggedIn';
import { FastifyPluginCallback } from 'fastify';
import UserService from './userService';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authenticateRoute, { prefix: '/' });

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
