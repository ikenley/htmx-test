import { Router } from "express";
import { injectable } from "tsyringe";
import { ConfigOptions } from "../../config";

const route = Router();

@injectable()
export default class StatusController {
  constructor(protected config: ConfigOptions) {}

  public registerRoutes(app: Router) {
    app.use("/status", route);

    route.get("/", (_req, res) => {
      res.send({ status: "ok" });
    });

    route.get("/health", (_req, res) => {
      res.send({ status: "ok" });
    });

    route.get("/info", (_req, res) => {
      res.send(this.config.app);
    });

    route.get("/error/:statusCode", (req, res) => {
      const statusCode = parseInt(req.params.statusCode);
      res.status(statusCode);
      res.send(this.config.app);
    });
  }
}
