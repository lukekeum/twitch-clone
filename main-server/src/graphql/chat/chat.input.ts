import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class SubChatArgs {
  @Field(() => String)
  targetId: string;
}
