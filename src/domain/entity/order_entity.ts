class Order {
  constructor(
    public readonly id: number,
    public readonly sender_name: string,
    public readonly recipent_name: string,
    public readonly origin: string,
    public readonly tracking_number: string,
    public readonly destination: string,
    public readonly status: number
  ) {}
}

export default Order;
