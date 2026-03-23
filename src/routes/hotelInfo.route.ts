import * as hotelInfoController from "../controllers/hoteInfo.controller";

import { createRoute, RouteConfig } from "./route.utils";

/**
 * @openapi
 * /hotel-info/{region}/{town}:
 *   get:
 *     summary: Get hotel information for a specific region and town
 *     parameters:
 *       - in: path
 *         name: region
 *         required: true
 *         schema:
 *           type: string
 *         description: The region to search in
 *       - in: path
 *         name: town
 *         required: true
 *         schema:
 *           type: string
 *         description: The town to search in
 *     responses:
 *       200:
 *         description: OK
 */
export const hotelInfoRoutes = (): RouteConfig => {
  return createRoute("/hotel-info", (router) => {
    router.get("/:region/:town", hotelInfoController.getHotelInfo);
  });
};