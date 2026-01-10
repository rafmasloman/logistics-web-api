export type OrderType = {
  sender_name: string;
  recipent_name: string;
  origin: string;
  destination: string;
  tracking_number: string;
  status: number;
};

export type OrderStoreType = {
  sender_name: string;
  recipent_name: string;
  origin: string;
  destination: string;
  status: number;
};

export type OrderFindByTrackingNumberType = {
  tracking_number: string;
};

export type OrderUpdateStatusType = {
  status: number;
};

export type OrderIdType = {
  id: string;
};
