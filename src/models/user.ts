import client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const { PEPPER, SALT_ROUNDS } = process.env;

export type user = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export type makingOrderInfo = {
  id?: number;
  quantity: number;
  orderId: string;
  productId: string;
};
export class userStore {
  async index(): Promise<user[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await connection.query(sql);
      connection.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  }

  async show(userId: number): Promise<user> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM users WHERE id = ($1);";
      const result = await connection.query(sql, [userId]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot get user: ${err}`);
    }
  }

  async create(u: user): Promise<user> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *;";
      const hash = bcrypt.hashSync(
        u.password + (PEPPER as string),
        parseInt(SALT_ROUNDS as string)
      );
      const result = await connection.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        hash,
      ]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot create user ${u.username}: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<null | user> {
    try {
      const connection = await client.connect();
      const sql = "SELECT password_digest FROM users WHERE username=($1);";
      const result = await connection.query(sql, [username]);
      console.log(password + PEPPER);
      if (result.rows.length) {
        const users = result.rows[0];
        console.log(users);
        if (bcrypt.compareSync(password + PEPPER, users.password_digest)) {
          return users;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Cannot authenticate user ${username}: ${err}`);
    }
  }
  async addProduct(
    userId: number,
    productId: number,
    quantityInput: number
  ): Promise<makingOrderInfo | undefined> {
    try {
      const connection = await client.connect();
      const orderQuery =
        "SELECT id FROM orders WHERE user_id = ($1) AND current_status = 'active';";
      const orderResult = await connection.query(orderQuery, [userId]);
      const orderId: number = orderResult.rows[0].id;
      if (orderId) {
        const addProductQuery =
          "INSERT INTO order_details (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING *;";
        const result = await connection.query(addProductQuery, [
          productId,
          quantityInput,
          orderId,
        ]);
        const MakingOrder = result.rows[0];
        connection.release();
        return MakingOrder;
      } else {
        connection.release();
        console.error(`There are no active orders for user ${userId}`);
      }
    } catch (err) {
      throw new Error(`Cannot add product ${productId} to order: ${err}`);
    }
  }
}
