import { injectable } from "tsyringe";
import { Router } from "express";
import AiController from "../components/ai/AiController";
import StatusController from "../components/status/StatusController";

@injectable()
export default class RouteService {
  constructor(
    protected aiController: AiController,
    protected statusController: StatusController
  ) {}

  public registerRoutes() {
    const app = Router();

    this.aiController.registerRoutes(app);
    this.statusController.registerRoutes(app);

    return app;
  }
}
