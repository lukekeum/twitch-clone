import '@src/dotenv.config';
import 'reflect-metadata';
import Database from '@src/database.class';

const database = new Database();

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await Database.close('default');
});
