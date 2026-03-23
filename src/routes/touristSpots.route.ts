import * as touristSpotsController from "../controllers/touristSpots.controller";

import { createRoute, RouteConfig } from "./route.utils";

/**
 * @openapi
 * /tourist-spots/{region}/{town}:
 *   get:
 *     summary: Get tourist spots for a specific region and town
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
export const touristSpotsRoutes = (): RouteConfig => {
  return createRoute("/tourist-spots", (router) => {
    router.get("/:region/:town", touristSpotsController.getTouristSpots);
  });
};