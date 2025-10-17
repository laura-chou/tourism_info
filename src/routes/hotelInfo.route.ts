import * as hotelInfoController from "../controllers/hoteInfo.controller";

import { createRoute, RouteConfig } from "./route.utils";

export const hotelInfoRoutes = (): RouteConfig => {
  return createRoute("/hotel-info", (router) => {
    router.get("/:region/:town", hotelInfoController.getHotelInfo);
  });
};