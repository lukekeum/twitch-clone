import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class VersionResolver {
  @Query(() => String)
  version() {
    return `${process.env.VERSION}`;
  }
}
