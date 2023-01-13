import isLoggedIn from '@src/hooks/isLoggedIn';
import UserService from './userService';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/customError.class';

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

  fastify.get(
    '/user',
    async (req: FastifyRequest<{ Querystring: { id: string } }>, res) => {
      const { id } = req.query;

      if (!id) {
        throw new CustomError({
          type: ErrorType.NOT_FOUND,
          message: 'User not found',
        });
      }

      const user = await User.findOne({
        where: { identifier: id },
        relations: ['streamSetting'],
      });

      void res.send(user);

      return;
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
