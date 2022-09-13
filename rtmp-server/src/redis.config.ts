import * as redis from 'redis';

const client = redis.createClient({});

client.on('connect', () => {
  console.log('redis client connected');
});

export default client;
