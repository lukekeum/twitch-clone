import { Category } from '@src/entities/category.entity';
import { StreamSetting } from '@src/entities/streamSetting.entity';
import { User } from '@src/entities/user.entity';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';
import { omit } from 'lodash';
import { Service } from 'typedi';
import { BroadcastSettingArgs } from './streamSetting.input';

@Service()
export class StreamSettingService {
  async getStreamURL(userId: string) {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new CustomError({
        type: ErrorType.NOT_FOUND,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    return `${process.env.PROXY_ADDRESS}/live/${user.identifier}`;
  }

  async changeSettings(userId: string, input: BroadcastSettingArgs) {
    const settings = await StreamSetting.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!settings) {
      throw new CustomError({
        type: ErrorType.NOT_FOUND,
        message: ResponseMessage.INVALID_INPUT,
      });
    }

    const category = input.category
      ? await Category.findOne({ where: { id: input.category } })
      : null;

    const changedInput = omit(input, ['category']);

    if (category) {
      settings.category = category;
    }

    // TODO: Change if statement to forEach/map
    if (changedInput.adultContents) {
      settings.adultContents = changedInput.adultContents;
    }
    if (changedInput.latencyMode) {
      settings.latencyMode = changedInput.latencyMode;
    }
    if (changedInput.title) {
      settings.title = changedInput.title;
    }
    if (changedInput.description) {
      settings.description = changedInput.description;
    }

    return settings;
  }
}
