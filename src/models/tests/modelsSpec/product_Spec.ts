import dotenv from "dotenv";
import { productStore } from "../../product";

dotenv.config();

const store = new productStore();
describe("product Model", () => {
  it("should have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of product", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
it("has a show method", () => {
  expect(store.show).toBeDefined();
});

it("has a create method", () => {
  expect(store.create).toBeDefined();
});
it("create should add a product", async () => {
  const result = await store.create({
    name: "notepad",
    price: 9,
    category: "office",
  });

  expect(result).toEqual({
    id: 8,
    name: "notepad",
    price: 9,
    category: "office",
  });
});

it("show should return the product with the given id", async () => {
  const result = await store.show(8);

  expect(result).toEqual({
    id: 8,
    name: "notepad",
    price: 9,
    category: "office",
  });
});
