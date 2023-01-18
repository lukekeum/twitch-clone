import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class BroadcastSettingArgs {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => ID, { nullable: true })
  category: string;

  @Field(() => Boolean, { nullable: true })
  latencyMode: boolean;

  @Field(() => Boolean, { nullable: true })
  adultContents: boolean;
}
