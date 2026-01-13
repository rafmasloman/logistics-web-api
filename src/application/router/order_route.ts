import { Router } from "express";
import OrderController from "../controllers/order_controller";

class OrderRoute {
  public router: Router;
  public orderController: OrderController;

  constructor(router: Router, orderController: OrderController) {
    this.router = router;
    this.orderController = orderController;
  }

  registerRoute() {
    this.router.get("/", this.orderController.getAllOrders);
    this.router.post("/", this.orderController.createOrder);
  }
}

export default OrderRoute;
