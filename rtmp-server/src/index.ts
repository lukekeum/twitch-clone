import './dotenv.config';
import NodeMediaServer, { Config } from 'node-media-server';
import { resolve } from 'path';

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
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        },
      ],
    },
  };

  const node_media_server = new NodeMediaServer(config);

  node_media_server.run();
}

bootstrap();
