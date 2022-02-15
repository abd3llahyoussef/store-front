import app from "../../../server";
import supertest from "supertest";
import { user, userStore } from "../../user";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();
const { PEPPER, TOKEN_SECRET } = process.env;
const request = supertest(app);
const store = new userStore();

const createAuth = (username: string): string => {
  return jwt.sign({ username: username }, TOKEN_SECRET as unknown as string);
};
const testToken = createAuth("test");

export const userList: user[] = [
  {
    username: "testuser1",
    firstname: "Freddie",
    lastname: "Mercury",
    password: "testpwd1",
  },
];
describe("Orders controller", () => {
  beforeAll(async () => {
    await store.create(userList[0]);
  });

  it("posts on /orders: returns an active order in JSON format", async () => {
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ userId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      userId: 1,
      currentStatus: "active",
    });
  });
});
