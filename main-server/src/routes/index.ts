import { FastifyPluginAsync } from 'fastify';

const rootRoute: FastifyPluginAsync = async (server, opts) => {
  server.get('/ping', async (request, reply) => {
    return {
      message: 'pong',
      version: 'v1',
    };
  });
};

export default rootRoute;
