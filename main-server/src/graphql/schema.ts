import { NonEmptyArray } from 'type-graphql';
import version from './version';
import user from './user';

const RESOLVERS: NonEmptyArray<Function> = [version, user];

export default RESOLVERS;
