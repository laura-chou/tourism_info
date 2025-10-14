import { foodInfoRoutes } from "./foodInfo.route";
import { RouteConfig } from "./route.utils";

const protectedRoutes: Array<RouteConfig> = [
  foodInfoRoutes()
];

export default protectedRoutes;
