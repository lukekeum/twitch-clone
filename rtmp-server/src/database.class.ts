import 'pg';
import {
  ConnectionOptions,
  createConnection,
  Connection,
  getConnection,
} from 'typeorm';

export default class Database {
  constructor(private connectionOptions?: ConnectionOptions) {
    this.connectionOptions || void this._initialOptions();
  }

  _initialOptions(): void {
    this.connectionOptions = {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
      dropSchema: process.env.TYPEORM_DROPSCHEMA === 'true',
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
      entities: ['src/entities/*.entity.ts'],
      migrations: [__dirname + '/migrations/**/*.ts'],
      cli: {
        entitiesDir: 'src/entities/*.entity.ts',
        migrationsDir: __dirname + '/migration',
      },
    };
  }

  connect(connectionOptions?: ConnectionOptions): Promise<Connection> {
    return createConnection(
      (connectionOptions || this.connectionOptions) as ConnectionOptions
    );
  }

  static async close(connectionName: string): Promise<boolean> {
    try {
      const conn = getConnection(connectionName);

      await conn.close();

      return true;
    } catch (err) {
      return false;
    }
  }
}
