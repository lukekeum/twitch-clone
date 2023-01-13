/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from 'type-graphql';
import version from './version';
import user from './user';
import follow from './follow';

const RESOLVERS: NonEmptyArray<Function> = [version, user, follow];

export default RESOLVERS;
