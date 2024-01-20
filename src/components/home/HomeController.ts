import { DependencyContainer, injectable } from "tsyringe";
import { Request, Response, Router } from "express";
import { CreatePunParams } from "../../types";
import { ConfigOptions } from "../../config";
//import AuthenticationMiddlewareProvider from "../../auth/AuthenticationMiddlewareProvider";
import AiService from "./AiService";

const route = Router();

@injectable()
export default class HomeController {
  constructor(
    protected config: ConfigOptions //protected authenticationMiddlewareProvider: AuthenticationMiddlewareProvider
  ) {}

  public registerRoutes(app: Router) {
    app.use("/", route);

    //route.use(this.authenticationMiddlewareProvider.provide());

    // const getService = (res: Response) => {
    //   const container = res.locals.container as DependencyContainer;
    //   return container.resolve(AiService);
    // };

    route.get("/", async (_req: Request<{}, {}, CreatePunParams>, res) => {
      // const service = getService(res);
      // const result = await service.createPun(req.body);
      // res.send(result);
      res.render("index", { title: "Open the pod bay doors, HAL" });
    });
  }
}
