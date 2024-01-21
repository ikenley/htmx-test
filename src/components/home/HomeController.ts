import { injectable } from "tsyringe";
import { Request, Router } from "express";
import { ClickedParams } from "../../types";
import { ConfigOptions } from "../../config";
//import AuthenticationMiddlewareProvider from "../../auth/AuthenticationMiddlewareProvider";

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

    route.get("/", async (_req, res) => {
      // const service = getService(res);
      // const result = await service.createPun(req.body);
      // res.send(result);
      res.render("index", { title: "Example Title" });
    });

    route.post("/clicked", async (req: Request<{}, {}, ClickedParams>, res) => {
      // const service = getService(res);
      // const result = await service.createPun(req.body);
      // res.send(result);
      res.render("clicked", { name: req.body.name });
    });
  }
}
