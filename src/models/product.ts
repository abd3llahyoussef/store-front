import client from "../database";

export type product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class productStore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get product${err}`);
    }
  }
  async show(id: number): Promise<product> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products WHERE id = ($1);";
      const result = await connection.query(sql, [id]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (err) {
      throw new Error(`Cannot get product: ${err}`);
    }
  }

  async create(product: product): Promise<product> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const newProduct = result.rows[0];
      connection.release();
      return newProduct;
    } catch (err) {
      throw new Error(`Cannot add product ${product.name}: ${err}`);
    }
  }
}
