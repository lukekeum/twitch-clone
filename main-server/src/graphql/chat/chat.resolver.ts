import DataLoader from 'dataloader';
import { Chat } from '@src/entities/chat.entity';
import { groupBy } from 'lodash';
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { In } from 'typeorm';
import { IsLoggedIn } from '@src/hooks/graphql/isLoggedIn';
import { ContextType } from '@src/utils/graphql';
import { CustomError, ErrorType } from '@src/utils/errors/customError.class';
import { ResponseMessage } from '@src/utils/errors/responseMessage';
import { ChatService } from './chat.service';
import { SubChatArgs } from './chat.input';

const channel = 'CHAT_CHANNEL';

@Resolver(() => Chat)
export class ChatResolver {
  @Query(() => [Chat])
  @Loader<string, Chat[]>(async (ids) => {
    const chats = await Chat.find({
      where: { target: { identifier: In([...ids]) } },
      relations: ['target', 'target.userProfile', 'user', 'user.userProfile'],
    });
    const chatsByTargetId = groupBy(chats, 'target.identifier');
    return ids.map((id) => chatsByTargetId[id] ?? []);
  })
  getChats(@Arg('targetId', () => String) targetId: string) {
    return (dataloader: DataLoader<string, Chat[]>) =>
      dataloader.load(targetId);
  }

  @UseMiddleware([IsLoggedIn(true)])
  @Mutation(() => Boolean)
  async addChat(
    @Ctx() { req }: ContextType,
    @PubSub() pubSub: PubSubEngine,
    @Arg('targetId', () => String) targetId: string,
    @Arg('message', () => String) message: string
  ) {
    if (message.length === 0) {
      throw new CustomError({
        type: ErrorType.BAD_REQUEST,
        message: ResponseMessage.INVALID_INPUT,
      });
    }

    const result = await ChatService.addChat(req.userId, targetId, message);

    if (result.data) {
      await pubSub.publish(`${channel}`, result.data);
    }

    return result.result;
  }

  @Subscription({
    topics: channel,
    filter: ({ payload, args }: { payload: Chat; args: SubChatArgs }) => {
      return payload.target.identifier === args.targetId;
    },
  })
  subChat(@Args() input: SubChatArgs, @Root() chat: Chat): Chat {
    const returnValue = JSON.parse(
      JSON.stringify(chat),
      ChatService.reviver.bind(this)
    );
    return returnValue;
  }
}
