import { User } from '@src/entities/user.entity';
import { FastifyRequest } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import client from '@src/redis.config';
import { ResponseMessage } from '@src/utils/errors/responseMessage';

export default class UserService {
  static async me(req: FastifyRequest) {
    const user = await User.findOne(req.userId, {
      relations: ['userProfile'],
    });

    return instanceToPlain(user);
  }

  static async isStreaming(userId: string) {
    const user = await User.findOne(userId, { relations: ['streamSetting'] });

    if (!user) {
      throw new CustomError({
        type: ErrorType.NOT_FOUND,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    const { streamKey } = user.streamSetting;

    try {
      const streamURL = `${process.env.HLS_STREAM_ADDRESS}/${streamKey}/index.m3u8`;

      const result = client.sIsMember('streaming', streamKey);

      return {
        result,
        url: streamURL,
      };
    } catch (err) {
      return {
        result: false,
      };
    }
  }
}
