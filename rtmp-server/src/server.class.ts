import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyCors, { FastifyCorsOptions } from 'fastify-cors';
import { CustomError, ErrorType } from './utils/customError.class';

export default class Server {
  private readonly app: FastifyInstance;
  private corsOptions: FastifyCorsOptions;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);
    this.corsSetup(process.env.CORS_WHITELISTS);

    this.app.register(fastifyCors, this.corsOptions);
  }

  corsSetup(whitelists: string) {
    const whitelist = whitelists.split(',');

    if (whitelists === '*') {
      this.corsOptions = {
        origin: true,
        credentials: true,
      };
      return;
    }

    this.corsOptions = {
      origin: (origin, cb) => {
        if (whitelist.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          throw new CustomError({
            type: ErrorType.FORBIDDEN,
            message: 'Not allowed access by cors',
          });
        }
      },
      credentials: true,
    };
  }

  listen(port: number | string) {
    this.app.listen(port, '');
  }
}
