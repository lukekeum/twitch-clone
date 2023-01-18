import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { Config } from 'apollo-server-fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Server } from 'http';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { getConnection } from 'typeorm';
import generateSchema from './schema';

export default function getGraphqlServerOptions(httpServer: Server) {
  const schema = generateSchema();

  const graphqlServerOption: Config = {
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ request: req, reply: res }) => {
      if (!req) {
        return {
          req,
          res,
        };
      }
      const accessToken: string | undefined = req.cookies.access_token;
      const qid: string | undefined = req.cookies.qid;
      return {
        req,
        res,
        cookies: {
          accessToken,
          qid,
        },
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  };

  return graphqlServerOption;
}

export interface ContextType {
  req: FastifyRequest;
  res: FastifyReply;
  cookies: {
    accessToken?: string;
    qid?: string;
  };
}
