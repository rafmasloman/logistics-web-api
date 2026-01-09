import {
  OrderFindByTrackingNumberType,
  OrderStoreType,
} from "../../domain/dto/order_dto";

export interface IUserUsecase {
  createOrder: (params: OrderStoreType) => {};
  trackOrder: (params: OrderFindByTrackingNumberType) => {};
  updateOrder: (params: OrderStoreType) => {};
}
