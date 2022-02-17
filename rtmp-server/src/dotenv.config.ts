import { resolve } from 'path';
import { config } from 'dotenv';

const { NODE_ENV = 'development' } = process.env;

if (NODE_ENV === 'production') {
  config({ path: resolve(process.cwd(), '.env') });
} else {
  config({ path: resolve(process.cwd(), '.env.development') });
}
