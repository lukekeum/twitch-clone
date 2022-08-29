import './redis.config';
import './dotenv.config';
import 'reflect-metadata';
import Server from './server.class';
import Database from './database.class';

const server = new Server({
  logger: true,
});
const database = new Database();

async function bootstrap() {
  await database.connect();
  await server.start(process.env.PORT);
}

void bootstrap();
