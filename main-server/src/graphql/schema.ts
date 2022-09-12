import { NonEmptyArray } from 'type-graphql';
import version from './version';

const RESOLVERS: NonEmptyArray<Function> = [version];

export default RESOLVERS;
