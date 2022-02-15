import app from "../../../server";
import supertest from "supertest";

const request = supertest(app);

it("gets /products: returns a list of products in JSON format", async () => {
  const response = await request.get("/products");

  expect(response.status).toBe(200);
  expect(response.body).toEqual([
    {
      id: 1,
      name: "bike",
      price: 200,
      category: "sports",
      rating: 4.32,
    },
  ]);
});

it("gets /products/:id: returns a product in JSON format", async () => {
  const response = await request.get("/products/1");

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    id: 1,
    name: "bike",
    price: 200,
    category: "sports",
    rating: 4.32,
  });
});
