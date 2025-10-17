import { foodInfoRoutes } from "./foodInfo.route";
import { hotelInfoRoutes } from "./hotelInfo.route";
import { RouteConfig } from "./route.utils";

const protectedRoutes: Array<RouteConfig> = [
  foodInfoRoutes(),
  hotelInfoRoutes()
];

export default protectedRoutes;
