import client from "../database";

export type order = {
  id?: number;
  status: string;
  user_id: number;
};

export class orderStore {
  async create(userId: number): Promise<order> {
    try {
      const connection = await client.connect();
      const checkActiveQuery =
        "SELECT id FROM orders WHERE user_id = ($1) AND current_status = 'active';";
      const checkActiveQueryRes = await connection.query(checkActiveQuery, [
        userId,
      ]);
      if (checkActiveQueryRes.rows[0]) {
        connection.release();
        throw new Error("an active order for this user already exists");
      } else {
        const sql =
          "INSERT INTO orders (user_id, current_status) VALUES ($1, $2) RETURNING *;";
        const result = await connection.query(sql, [userId, "active"]);
        const orderInfo = result.rows[0];
        connection.release();
        return orderInfo;
      }
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
    }
  }
  async getCompletedOrders(userId: number): Promise<order[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = ($1) AND current_status = 'complete'";
      const result = await connection.query(sql, [userId]);
      const orderList: order[] = result.rows[0];
      connection.release();
      return orderList;
    } catch (err) {
      throw new Error(`Cannot retrieve completed orders: ${err}`);
    }
  }
}
