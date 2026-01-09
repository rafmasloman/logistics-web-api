import { OrderFindByTrackingNumberType } from "../../domain/dto/order_dto";
import Order from "../../domain/entity/order_entity";

export interface IOrderRepository {
  save: (params: Order) => {};
  findAll: () => {};
  findByTrackOrder: (params: OrderFindByTrackingNumberType) => {};
  findById: (id: number) => {};
  update: (params: Order) => {};
}
