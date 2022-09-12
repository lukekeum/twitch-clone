import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, Config } from 'apollo-server';
import getGraphqlServerOptions from '../graphql';

export function getGraphqlTestingTools(config: Config = {}) {
  const serverOptions = getGraphqlServerOptions();

  serverOptions.context = {};

  const server = new ApolloServer({
    ...(serverOptions as any),
    ...config,
  });

  const { query, mutate } = createTestClient(server);

  return { query, mutate };
}
