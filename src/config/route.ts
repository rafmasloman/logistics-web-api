import OrderRoute from "../application/router/order_route";
import { Router } from "express";

class RouteApp {
  route: Router;
  orderRoute: OrderRoute;

  constructor(orderRoute: OrderRoute, route: Router) {
    this.orderRoute = orderRoute;
    this.route = route;
  }

  getRoutes() {
    this.orderRoute.registerRoute();
    this.route.use("/orders", this.route);

    return this.route;
  }
}

export default RouteApp;
