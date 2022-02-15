import { orderStore } from "../../order";

const store = new orderStore();

describe("Order model", () => {
  it("has a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("has a getCompletedOrders method", () => {
    expect(store.getCompletedOrders).toBeDefined();
  });
});

it("getCompletedOrders should return a all completed orders for user", async () => {
  const result = await store.getCompletedOrders(1);

  expect(result).toEqual([
    {
      id: 1,
      user_id: 1,
      status: "complete",
    },
  ]);
});
