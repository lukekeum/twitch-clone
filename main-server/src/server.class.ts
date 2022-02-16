import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyCors, { FastifyCorsOptions } from 'fastify-cors';

import rootRoute from './routes';
import { CustomError, ErrorType } from './utils/customError.class';

export default class Server {
  private readonly app: FastifyInstance;
  private corsOptions: FastifyCorsOptions;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);

    this.corsSetup(process.env.CORS_WHITELISTS);

    try {
      void this.app.register(fastifyCors, this.corsOptions);
      void this.app.register(rootRoute, { prefix: '/' });
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  async start(port: string | number) {
    try {
      await this.app.listen(port, '');
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  corsSetup(whitelists: string) {
    const whiltelist = whitelists.split(',');

    this.corsOptions = {
      origin: (origin, cb) => {
        if (whiltelist.indexOf(origin) !== -1) {
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
}
