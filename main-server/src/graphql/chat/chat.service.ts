import { Chat } from '@src/entities/chat.entity';
import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';
import { Service } from 'typedi';

@Service()
export class ChatService {
  public async addChat(userId: string, targetIdent: string, message: string) {
    const user = await User.findOne({
      where: { id: userId },
      relations: ['userProfile'],
    });

    if (!user) {
      throw new CustomError({
        type: ErrorType.UNAUTHORIZED,
        message: ResponseMessage.SHOULD_LOGIN,
      });
    }

    if (message.startsWith('/')) {
      const result = await this.checkCommand(user, targetIdent, message);

      if (result) {
        return { result: true, data: null };
      }
    }

    const target = await User.findOne({
      where: { identifier: targetIdent },
      relations: ['userProfile'],
    });

    if (!target) {
      throw new CustomError({
        type: ErrorType.NOT_FOUND,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    const chat = await Chat.create({
      target,
      user,
      message,
    }).save();

    return { result: true, data: chat };
  }

  private async checkCommand(
    user: User,
    targetId: string,
    message: string
  ): Promise<boolean> {
    return false;
  }

  public reviver(key: string, value: unknown) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (typeof value === 'string' && dateFormat.test(value)) {
      return new Date(value);
    }

    return value;
  }
}
