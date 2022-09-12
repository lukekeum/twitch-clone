import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import getGraphqlServerOptions from '../graphql';

const serverOptions = getGraphqlServerOptions();

const server = new ApolloServer(serverOptions);

const { query, mutate } = createTestClient(server);

export { query, mutate };
