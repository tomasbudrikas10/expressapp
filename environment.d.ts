declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_KEY: string;
      SECRET: string;
    }
  }
}
export {}