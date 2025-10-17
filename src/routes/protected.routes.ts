import { foodInfoRoutes } from "./foodInfo.route";
import { hotelInfoRoutes } from "./hotelInfo.route";
import { RouteConfig } from "./route.utils";
import { touristSpotsRoutes } from "./touristSpots.route";

const protectedRoutes: Array<RouteConfig> = [
  foodInfoRoutes(),
  hotelInfoRoutes(),
  touristSpotsRoutes()
];

export default protectedRoutes;
