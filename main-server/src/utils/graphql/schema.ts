import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import RESOLVERS from '@src/graphql/schema';
import redisPubSub from './redisPubSub';
import { Container } from 'typedi';

export default function generateSchema(): GraphQLSchema {
  const pubSub = redisPubSub();

  const schema = buildSchemaSync({
    resolvers: RESOLVERS,
    container: Container,
    dateScalarMode: 'isoDate',
    pubSub,
  });

  return schema;
}
