import { User } from '@src/entities/user.entity';
import { FastifyRequest } from 'fastify';
import { instanceToPlain } from 'class-transformer';

export default class UserService {
  static async me(req: FastifyRequest) {
    const user = await User.findOne(req.userId, {
      relations: ['userProfile'],
    });

    return instanceToPlain(user);
  }
}
