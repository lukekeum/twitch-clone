import { User } from '@src/entities/user.entity';
import { FastifyRequest, FastifyReply } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import axios from 'axios';

export default class UserService {
  static async me(req: FastifyRequest, res: FastifyReply) {
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
        message: 'User not found',
      });
    }

    const { streamKey } = user.streamSetting;

    try {
      const streamURL = `${process.env.HLS_STREAM_ADDRESS}/${streamKey}/index.m3u8`;

      await axios.get(streamURL);

      return {
        result: true,
        url: streamURL,
      };
    } catch (err) {
      return {
        result: false,
      };
    }
  }
}
