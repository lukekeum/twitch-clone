import { StreamSetting } from '@src/entities/streamSetting.entity';
import { CustomError, ErrorType } from '@src/utils/customError.class';
import { FastifyReply } from 'fastify';

export default class StreamService {
  static async user(stream_id: string, res: FastifyReply) {
    const setting = await StreamSetting.findOne({ streamKey: stream_id });

    if (!setting) {
      throw new CustomError({
        type: ErrorType.NOT_FOUND,
        message: 'Invalid Stream Key',
      });
    }

    res.send(setting?.fk_user_id);
  }
}
