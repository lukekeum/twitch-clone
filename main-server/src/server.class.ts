import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import rootRoute from './routes';

export default class Server {
  private readonly app: FastifyInstance;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);

    this.app.register(rootRoute, { prefix: '/' });
  }

  async start(port: string | number) {
    try {
      await this.app.listen(port, '');
      this.app.log.info(`Server listening on ${port}`);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }
}
