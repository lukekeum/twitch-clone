import { FastifyPluginCallback } from 'fastify';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  done();
};

export default userRoute;
