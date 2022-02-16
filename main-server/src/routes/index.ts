import { FastifyPluginCallback } from 'fastify';
import authRoute from './v1/auth';

const rootRoute: FastifyPluginCallback = (fastify, _, done) => {
  void fastify.register(authRoute, { prefix: '/v1/auth' });

  void fastify.get('/ping', async () => {
    return {
      message: 'pong',
      version: 'v1',
    };
  });

  done();
};

export default rootRoute;
