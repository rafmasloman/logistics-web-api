import { PoolClient } from "pg";
import { IOrderRepository } from "../../application/repositories/order_repository";
import { OrderFindByTrackingNumberType } from "../../domain/dto/order_dto";
import Order from "../../domain/entity/order_entity";

class OrderRepository implements IOrderRepository {
  db: PoolClient;

  constructor(db: PoolClient) {
    this.db = db;
  }

  async save(params: Order) {
    try {
      const query = {
        name: "query-mutation-insert-order",
        text: `INSERT INTO orders(sender_name, recipent_name, origin, destination, tracking_number, status) VALUES($1, $2, $3, $4, $5, $6)`,
        values: [
          params.sender_name,
          params.recipent_name,
          params.origin,
          params.destination,
          params.tracking_number,
          "PENDING",
        ],
      };

      const exec = await this.db.query(query);

      return exec;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const query = {
        name: "query-get-all-orders",
        text: "SELECT (sender_name, recipent_name, origin, destination, tracking_number, status) FROM orders",
      };

      const exec = await this.db.query(query);

      const results = exec.rows;

      return results;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const query = {
        name: "query-get-order-detail",
        text: "SELECT (sender_name, recipent_name, origin, destination, tracking_number, status) FROM orders WHERE id = $1",
        values: [id],
      };

      const exec = await this.db.query(query);

      return exec;
    } catch (error) {
      throw error;
    }
  }

  async findByTrackOrder(params: OrderFindByTrackingNumberType) {
    try {
      const query = {
        name: "query-get-order-detail",
        text: "SELECT (sender_name, recipent_name, origin, destination, tracking_number, status) FROM orders WHERE tracking_number= $1",
        values: [params.tracking_number],
      };

      const exec = await this.db.query(query);

      return exec.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update(params: Order) {
    try {
      const query = {
        name: "mutation-query-update-orders",
        text: `UPDATE orders SET 
               sender_name = $1, 
               recipent_name = $2, 
               origin = $3, 
               destination = $4, 
               tracking_number = $5, 
               status = $6`,
        values: [
          params.sender_name,
          params.recipent_name,
          params.origin,
          params.destination,
          params.tracking_number,
          params.status,
        ],
      };

      const exec = await this.db.query(query);

      console.log(`exec = ${exec}`);

      const order = await this.findById(params.id);

      if (order.rowCount !== 0) {
        return order.rows[0];
      }
    } catch (error) {
      throw error;
    }
  }
}

export default OrderRepository;
