import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import RESOLVERS from '@src/graphql/schema';

export default function generateSchema(): GraphQLSchema {
  const schema = buildSchemaSync({
    resolvers: RESOLVERS,
  });

  return schema;
}
