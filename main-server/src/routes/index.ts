import { FastifyPluginAsync } from 'fastify';

const rootRoute: FastifyPluginAsync = async (server) => {
  server.get('/ping', async () => {
    return {
      message: 'pong',
      version: 'v1',
    };
  });
};

export default rootRoute;
