import "reflect-metadata";
import "express-async-errors";
import { container } from "tsyringe";
import serverlessExpress from "@vendia/serverless-express";
import { ALBEvent, Context } from "aws-lambda";
//import { SSMClient } from "@aws-sdk/client-ssm";
import { getConfigOptions } from "./config";
import express from "express";
import Logger from "./loaders/logger";
import registerGlobalDependencies from "./loaders/registerGlobalDependencies";
import ExpressLoader from "./loaders/ExpressLoader";
//import SsmParamLoader from "./loaders/SsmParamLoader";

let serverlessExpressInstance: any = null;

const setup = async (event: ALBEvent, context: Context) => {
  // Inject SSM param configuration into env vars
  // const ssmClient = new SSMClient();
  // const ssmParamLoader = new SsmParamLoader(ssmClient);
  // const configParamName = process.env.CONFIG_SSM_PARAM_NAME!;
  // await ssmParamLoader.loadToEnv(configParamName);

  const config = getConfigOptions();
  const app = express();

  // Register dependencies
  await registerGlobalDependencies();
  // Configure Express
  const expressLoader = container.resolve(ExpressLoader);
  await expressLoader.load(app);

  app
    .listen(config.port, () => {
      Logger.info(`
#####################################
🤖  Server listening on port: ${config.port} 🤖
#####################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });

  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
};

/** Main entrypoint for Lambda function version of express app */
export const handler = (event: ALBEvent, context: Context) => {
  console.log("event", event);

  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }

  return setup(event, context);
};

export default handler;
