import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import RESOLVERS from '@src/graphql/schema';
import redisPubSub from './redisPubSub';

export default function generateSchema(): GraphQLSchema {
  const pubSub = redisPubSub();

  const schema = buildSchemaSync({
    resolvers: RESOLVERS,
    dateScalarMode: 'isoDate',
    pubSub,
  });

  return schema;
}
