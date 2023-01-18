/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from 'type-graphql';
import version from './version';
import user from './user';
import follow from './follow';
import streamSetting from './streamSetting';
import chat from './chat';

const RESOLVERS: NonEmptyArray<Function> = [
  version,
  user,
  follow,
  streamSetting,
  chat,
];

export default RESOLVERS;
