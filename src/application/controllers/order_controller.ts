import { Request, Response, Router } from "express";
import OrderUsecase from "../usecase/order_usecase";
import { OrderStoreType } from "../../domain/dto/order_dto";

class OrderController {
  public orderUsecase: OrderUsecase;

  constructor(orderUsecase: OrderUsecase) {
    this.orderUsecase = orderUsecase;
    this.getAllOrders = this.getAllOrders.bind(this);
    this.findByTrackingNumber = this.findByTrackingNumber.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  async getAllOrders(req: Request, res: Response) {
    const order = await this.orderUsecase.getAllOrders();

    return res.json({
      status: true,
      statusCode: 200,
      data: order,
      message: "Success to fetch orders data",
    });
  }

  async findByTrackingNumber(req: Request, res: Response) {
    const trackingNumber = req.params.tracking_number;

    const order = await this.orderUsecase.trackOrder({
      tracking_number: trackingNumber,
    });

    if (!order) {
      return res.json({
        status: false,
        statusCode: 404,
        data: order,
        message: `Order with tracking number not found = ${trackingNumber}`,
      });
    }
  }

  async createOrder(req: Request, res: Response) {
    const {
      destination,
      origin,
      recipent_name,
      sender_name,
      status,
      tracking_number,
    }: OrderStoreType = req.body;

    const order = await this.orderUsecase.createOrder({
      destination,
      origin,
      recipent_name,
      sender_name,
      status,
      tracking_number,
    });

    if (!order) {
      return res.json({
        status: false,
        statusCode: 500,
        data: null,
        message: "Failed to create order data",
      });
    }

    return res.json({
      status: true,
      statusCode: 200,
      data: null,
      message: "Success to create order data",
    });
  }

  async cancelOrder(req: Request, res: Response) {
    const id = Number(req.params.id);
    const order = await this.orderUsecase.cancelOrder(id);

    if (!order) {
      return res.json({
        status: false,
        statusCode: 500,
        data: null,
        message: "Failed to create order data",
      });
    }

    return res.json({
      status: true,
      statusCode: 201,
      data: null,
      message: "Success to create order data",
    });
  }
}

export default OrderController;
