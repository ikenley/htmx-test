import { injectable } from "tsyringe";
import { Router } from "express";
import HomeController from "../components/home/HomeController";
import StatusController from "../components/status/StatusController";

@injectable()
export default class RouteService {
  constructor(
    protected homeController: HomeController,
    protected statusController: StatusController
  ) {}

  public registerRoutes() {
    const app = Router();

    this.homeController.registerRoutes(app);
    this.statusController.registerRoutes(app);

    return app;
  }
}
