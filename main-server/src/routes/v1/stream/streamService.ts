import { StreamSetting } from '@src/entities/streamSetting.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';
import { FastifyReply } from 'fastify';

export default class StreamService {
  static async user(stream_id: string, res: FastifyReply) {
    const setting = await StreamSetting.findOne({ streamKey: stream_id });

    if (!setting) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: ResponseMessage.INVALID_INPUT,
      });
    }

    res.send(setting?.fk_user_id);
  }
}
