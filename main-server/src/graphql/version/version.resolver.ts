import { Query, Resolver } from 'type-graphql';

@Resolver()
export class VersionResolver {
  @Query(() => String)
  version() {
    return `${process.env.VERSION}`;
  }
}
