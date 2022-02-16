declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      CORS_WHITELISTS: string;
      PORT: string;

      // Typeorm Setting
      TYPEORM_CONNECTION: 'postgres' | 'mysql' | 'sqlite' | 'mssql';
      TYPEORM_HOST: string;
      TYPEORM_PORT: string;
      TYPEORM_USERNAME: string;
      TYPEORM_PASSWORD: string;
      TYPEORM_DATABASE: string;
      TYPEORM_SYNCHRONIZE: 'true' | 'false';
      TYPEORM_DROPSCHEMA: 'true' | 'false';
      TYPEORM_LOGGING: 'true' | 'false';
    }
  }
}

export {};
