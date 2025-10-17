import * as touristSpotsController from "../controllers/touristSpots.controller";

import { createRoute, RouteConfig } from "./route.utils";

export const touristSpotsRoutes = (): RouteConfig => {
  return createRoute("/tourist-spots", (router) => {
    router.get("/:region/:town", touristSpotsController.getTouristSpots);
  });
};