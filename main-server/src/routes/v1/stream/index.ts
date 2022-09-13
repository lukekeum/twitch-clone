import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import StreamService from './streamService';
import UserValidationJSON from './validation/user.validation.json';

const streamRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get(
    '/user',
    UserValidationJSON,
    async (req: FastifyRequest<{ Body: { stream_id: string } }>, res) => {
      const { stream_id } = req.body;

      return StreamService.user(stream_id, res);
    }
  );

  done();
};

export default streamRoute;
