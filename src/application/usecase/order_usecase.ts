import {
  OrderFindByTrackingNumberType,
  OrderStoreType,
  OrderType,
} from "../../domain/dto/order_dto";
import Order from "../../domain/entity/order_entity";
import OrderRepository from "../../infrastructure/repositories/order_repository";

export interface IOrderUsecase {
  createOrder: (params: OrderStoreType) => {};
  trackOrder: (params: OrderFindByTrackingNumberType) => {};
  updateOrder: (params: OrderStoreType, id: number) => {};
  getAllOrders: () => {};
  cancelOrder: (id: number) => {};
}

class OrderUsecase implements IOrderUsecase {
  public orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(params: OrderStoreType) {
    try {
      const order = new Order(
        params.sender_name,
        params.recipent_name,
        params.origin,
        "001",
        params.destination,
        1
      );

      const repo = await this.orderRepository.save(order);

      return repo;
    } catch (error) {
      throw error;
    }
  }

  async trackOrder(params: OrderFindByTrackingNumberType) {
    const repo = await this.orderRepository.findByTrackOrder({
      tracking_number: params.tracking_number,
    });

    if (!repo) {
      throw new Error("Order not found");
    }

    let result: OrderType = {
      destination: repo.destination,
      origin: repo.origin,
      recipent_name: repo.recipent_name,
      sender_name: repo.sender_name,
      status: repo.status,
      tracking_number: repo.tracking_number,
    };

    return result;
  }

  async getAllOrders() {
    const repo = await this.orderRepository.findAll();

    let result: OrderType[] = repo.map((item) => {
      return {
        destination: item.destination,
        origin: item.origin,
        recipent_name: item.recipent_name,
        sender_name: item.sender_name,
        status: item.status,
        tracking_number: item.tracking_number,
      };
    });

    return result;
  }

  async cancelOrder(id: number) {
    const order = await this.orderRepository.findById(id);

    await this.orderRepository.update({
      destination: order.destination,
      origin: order.origin,
      recipent_name: order.recipent_name,
      sender_name: order.sender_name,
      status: 3,
      tracking_number: order.tracking_number,
      id: order.id,
    });

    return order;
  }

  async updateOrder(params: OrderStoreType, id: number) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error("order not found");
    }

    await this.orderRepository.update({
      destination: params.destination,
      origin: params.origin,
      recipent_name: params.recipent_name,
      sender_name: params.sender_name,
      status: params.status,
      tracking_number: params.tracking_number,
    });
  }
}

export default OrderUsecase;
