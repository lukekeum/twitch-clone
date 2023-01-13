import './redis.config';
import './dotenv.config';
import { resolve } from 'path';
import { Config } from 'node-media-server';
import MediaServer from './mediaServer.class';
import Server from './server.class';
import Database from './database.class';

function bootstrap() {
  const config: Config = {
    rtmp: {
      port: Number(process.env.RTMP_PORT),
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: Number(process.env.HTTP_PORT),
      mediaroot: resolve(process.cwd(), process.env.MEDIA_RELATIVE_PATH || ''),
      allow_origin: '*',
    },
    trans: {
      ffmpeg: process.env.FFMPEG_LOC || '',
      tasks: [
        {
          app: 'live',
          ac: 'aac',
          vc: 'libx264',
          hls: true,
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        },
      ],
    },
  };

  const server = new Server({ logger: true });
  const database = new Database();
  const ms = new MediaServer(config);

  ms.run();
  database.connect().then(() => {
    server.listen(process.env.PROXY_PORT);
  });
}

bootstrap();
