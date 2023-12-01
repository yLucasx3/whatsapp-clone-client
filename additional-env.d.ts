declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      AUTH_SECRET: string;
      APP_JWT_SECRET: string;
      NEXTAUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GRAPHQL_URI: string;
    }
  }
}

export {};
