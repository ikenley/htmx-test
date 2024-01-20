import { injectable, inject } from "tsyringe";
import winston from "winston";
import { LoggerToken } from "../loaders/logger";
import { RequestIdToken } from "../middleware/dependencyInjectionMiddleware";

/** Provides a module-specific Logger instance.
 * Includes additional container-provides context values
 */
@injectable()
export default class LoggerProvider {
  constructor(
    @inject(LoggerToken) private logger: winston.Logger,
    @inject(RequestIdToken) private requestId: string
  ) {}

  /** Creates a child logger module */
  public provide(moduleName: string) {
    return this.logger.child({ module: moduleName, requestId: this.requestId });
  }
}
