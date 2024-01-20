import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: ".env" });

export type AppEnv = "local" | "test" | "dev" | "staging" | "prod";

export class ConfigOptions {
  api: { prefix: string };
  app: { env: AppEnv; name: string; version: string };
  aws: {
    region: string;
  };
  baseDomain: string | null;
  cognito: {
    userPoolId: string;
    userPoolClientId: string;
    userPoolClientSecret: string;
  };
  // db: {
  //   host: string;
  //   port: number;
  //   user: string;
  //   password: string;
  //   database: string;
  //   schema: string;
  // };
  logs: { level: string };
  nodeEnv: string;
  port: number;
}

/** Get ConfigOptions from env vars.
 * (This is a function to lazy-load and
 *    give bootstrap services time to inject env vars)
 */
export const getConfigOptions = () => {
  const config: ConfigOptions = {
    api: { prefix: "/htmx" },
    app: {
      env: process.env.APP_ENV as AppEnv,
      name: process.env.APP_NAME || "htmx-api",
      version: process.env.APP_VERSION!,
    },
    aws: {
      region: process.env.AWS_REGION!,
    },
    baseDomain: process.env.BASE_DOMAIN || null,
    cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID!,
      userPoolClientSecret: process.env.COGNITO_USER_POOL_CLIENT_SECRET!,
    },
    // db: {
    //   host: process.env.DB_HOST!,
    //   port: parseInt(process.env.DB_PORT!),
    //   user: process.env.DB_USER!,
    //   password: process.env.DB_PASSWORD!,
    //   database: process.env.DB_DATABASE!,
    //   schema: process.env.DB_SCEHMA!,
    // },
    logs: { level: process.env.LOGS__LEVEL || "http" },
    nodeEnv: process.env.NODE_ENV!,
    port: parseInt(process.env.PORT || "8090", 10),
  };

  return config;
};
