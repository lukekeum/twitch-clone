import '@src/dotenv.config';
import 'reflect-metadata';
import Database from '@src/database.class';
import Server from '@src/server.class';

const database = new Database();
const server = new Server();

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await Database.close('default');
});

export const instance = server.instance;
