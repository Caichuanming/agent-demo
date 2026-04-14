export interface AppConfig {
  env: string;
  port: number;
  apiPrefix: string;
  version: string;
  mysql: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
    password: string;
  };
}

export default (): AppConfig => ({
  env: process.env.NODE_ENV ?? "local",
  port: Number(process.env.SERVER_PORT ?? 3001),
  apiPrefix: process.env.API_PREFIX ?? "",
  version: process.env.APP_VERSION ?? "v1",
  mysql: {
    host: process.env.MYSQL_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "root",
    database: process.env.MYSQL_DATABASE ?? "agent_medical"
  },
  redis: {
    host: process.env.REDIS_HOST ?? "localhost",
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? ""
  }
});
