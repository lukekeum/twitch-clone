import { User } from '@src/entities/user.entity';
import { FastifyRequest, FastifyReply } from 'fastify';
import { instanceToPlain } from 'class-transformer';

export default class UserService {
  static async me(req: FastifyRequest, res: FastifyReply) {
    const user = await User.findOne(req.userId, {
      relations: ['userProfile'],
    });

    return instanceToPlain(user);
  }
}
