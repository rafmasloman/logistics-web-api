import OrderRepository from "../infrastructure/repositories/order_repository";
import express, { Express } from "express";
import OrderUsecase from "../application/usecase/order_usecase";
import OrderController from "../application/controllers/order_controller";
import { pool } from "./database";
import OrderRoute from "../application/router/order_route";
import RouteApp from "./route";

class BootstrapConfig {
  public express: Express;

  constructor(express: Express) {
    this.express = express;
  }

  async app() {
    try {
      const dbBootstrap = await pool.connect();

      const initializeRouter = express.Router();

      const orderRepository = new OrderRepository(dbBootstrap);
      const orderUsecase = new OrderUsecase(orderRepository);
      const orderController = new OrderController(orderUsecase);
      const orderRoutes = new OrderRoute(initializeRouter, orderController);

      const Route = new RouteApp(orderRoutes, initializeRouter);

      Route.getRoutes();
      this.express.use("/api/v1", initializeRouter);
    } catch (error) {
      console.log(`error : `, error);
    }
  }
}

export default BootstrapConfig;
