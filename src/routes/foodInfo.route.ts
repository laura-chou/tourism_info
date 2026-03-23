import * as foodInfoController from "../controllers/foodInfo.controller";

import { createRoute, RouteConfig } from "./route.utils";

/**
 * @openapi
 * /food-info/{region}/{town}:
 *   get:
 *     summary: Get food information for a specific region and town
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
export const foodInfoRoutes = (): RouteConfig => {
  return createRoute("/food-info", (router) => {
    router.get("/:region/:town", foodInfoController.getFoodInfo);
  });
};