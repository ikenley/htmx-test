import "reflect-metadata";
import "express-async-errors";
import { container } from "tsyringe";
import { getConfigOptions } from "./config";
import express from "express";
import Logger from "./loaders/logger";
import registerGlobalDependencies from "./loaders/registerGlobalDependencies";
import ExpressLoader from "./loaders/ExpressLoader";

async function startServer() {
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
🌐  Server listening on port: ${config.port} 🌐
#####################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
