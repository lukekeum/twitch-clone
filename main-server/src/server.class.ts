import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';

export default class Server {
  private readonly app: FastifyInstance;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);
  }

  async start(port: string | number) {
    try {
      await this.app.listen(port, '');
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }
}
