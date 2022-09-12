import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { VersionResolver } from '@src/graphql/version/version.resolver';

export default function generateSchema(): GraphQLSchema {
  const schema = buildSchemaSync({
    resolvers: [VersionResolver],
  });

  return schema;
}
