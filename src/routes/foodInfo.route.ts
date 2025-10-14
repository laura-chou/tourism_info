import * as foodInfoController from "../controllers/foodInfo.controller";

import { createRoute, RouteConfig } from "./route.utils";

export const foodInfoRoutes = (): RouteConfig => {
  return createRoute("/food-info", (router) => {
    router.get("/", foodInfoController.getFoodInfo);
  });
};