import { FastifyPluginCallback } from 'fastify';
import authRoute from './v1/auth';
import streamRoute from './v1/stream';
import userRoute from './v1/user';

const rootRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(authRoute, { prefix: '/v1/auth' });
  fastify.register(userRoute, { prefix: '/v1/user' });
  fastify.register(streamRoute, { prefix: '/v1/stream' });

  fastify.get('/ping', async () => {
    return {
      message: 'pong',
      version: 'v1',
    };
  });

  done();
};

export default rootRoute;
