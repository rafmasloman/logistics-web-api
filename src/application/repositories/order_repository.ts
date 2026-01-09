import { OrderFindByTrackingNumberType } from "../../domain/dto/order_dto";
import Order from "../../domain/entity/order_entity";

export interface IOrderRepository {
  save: (params: Order) => {};
  getAllOrders: () => {};
  findByTrackOrder: (params: OrderFindByTrackingNumberType) => {};
  findById: (id: string) => {};
  update: (params: Order) => {};
}
