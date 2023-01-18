import isLoggedIn from '@src/hooks/isLoggedIn';
import UserService from './userService';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authenticateRoute, { prefix: '/' });

  fastify.get(
    '/user',
    async (
      req: FastifyRequest<{ Querystring: { id: string } }>,
      res: FastifyReply
    ) => {
      const { id } = req.query;

      if (!id) {
        throw new CustomError({
          type: ErrorType.NOT_FOUND,
          message: ResponseMessage.USER_NOT_FOUND,
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
  fastify.get('/me', async (req: FastifyRequest) => {
    return UserService.me(req);
  });

  done();
};

export default userRoute;
