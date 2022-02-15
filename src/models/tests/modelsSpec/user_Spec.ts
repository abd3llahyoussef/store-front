import dotenv from "dotenv";
import { user, userStore } from "../../user";

dotenv.config();

const store = new userStore();

describe("User model", () => {
  it("has an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it("has a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("has a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("has an authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });
});
