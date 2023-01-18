import fastify, {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyServerOptions,
} from 'fastify';
import { IncomingMessage, ServerResponse, Server as HTTPServer } from 'http';
import fastifyCors, { FastifyCorsOptions } from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifyWebSocket from '@fastify/websocket';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { makeHandler } from 'graphql-ws/lib/use/@fastify/websocket';
import { ApolloServer, Config } from 'apollo-server-fastify';

import { CustomError, ErrorType } from './utils/errors/customError.class';
import getGraphqlServerOptions from './utils/graphql';
import { ResponseMessage } from './utils/errors/responseMessage';
import rootRoute from './routes';

export default class Server {
  private readonly app: FastifyInstance<
    HTTPServer,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance,
    JsonSchemaToTsProvider
  >;
  private readonly server: ApolloServer;
  private readonly apolloConfig: Config;
  private corsOptions: FastifyCorsOptions;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);
    this.corsSetup(process.env.CORS_WHITELISTS);

    const server = this.app.server;

    try {
      void this.app.register(fastifyCors, this.corsOptions);
      void this.app.register(fastifyCookie, {
        secret: process.env.COOKIE_SECRET,
      });
      void this.app.register(rootRoute, { prefix: '/' });
      void this.app.register(fastifyWebSocket);

      this.apolloConfig = getGraphqlServerOptions(server);

      this.server = new ApolloServer(this.apolloConfig);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  async start(port: string | number) {
    try {
      await this.server.start();

      void this.app.register(
        this.server.createHandler({
          cors: false,
          path: '/graphql',
        })
      );

      void this.app.register(async (fastify) => {
        fastify.get(
          '/subscription',
          { websocket: true },
          makeHandler(this.apolloConfig)
        );
      });

      await this.app.listen(port, '');
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  corsSetup(whitelists: string) {
    const whiltelist = whitelists.split(',');

    if (whitelists === '*') {
      this.corsOptions = {
        origin: true,
        credentials: true,
      };
      return;
    }

    this.corsOptions = {
      origin: (origin, cb) => {
        if (whiltelist.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          throw new CustomError({
            type: ErrorType.FORBIDDEN,
            message: ResponseMessage.NOT_ALLOWED_CORS,
          });
        }
      },
      credentials: true,
    };
  }

  get instance(): typeof this.app {
    return this.app;
  }
}
