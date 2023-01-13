declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      CORS_WHITELISTS: string;
      PROXY_PORT: string;
      VERSION: string;

      FFMPEG_LOC: string;
      MEDIA_RELATIVE_PATH: string;
      RTMP_PORT: string;
      HTTP_PORT: string;
      SERVER_ADDRESS: string;
      MEDIA_ADDRESS: string;
    }
  }
}

export {};
