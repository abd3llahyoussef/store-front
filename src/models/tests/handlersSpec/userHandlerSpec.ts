import { user, userStore } from "../../../models/user";
import app from "../../../server";
import supertest from "supertest";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const request = supertest(app);

dotenv.config();
const { PEPPER, TOKEN_SECRET } = process.env;
const store = new userStore();

const createAuth = (username: string): string => {
  return jwt.sign({ username: username }, TOKEN_SECRET as unknown as string);
};
const testToken = createAuth("test");

const userList: user[] = [
  {
    username: "testuser1",
    firstname: "Freddie",
    lastname: "Mercury",
    password: "testpwd1",
  },
];
describe("Users controller", () => {
  it("posts /users: returns a token", async () => {
    const response = await request
      .post("/users")
      .set("Authorization", `Bearer ${testToken}`)
      .send(userList[0]);

    expect(response.status).toBe(200);
  });

  it("gets /users/:id: returns a user in JSON format with a hashed password", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${testToken}`);
    const pwdCheck = bcrypt.compareSync(
      userList[0].password + PEPPER,
      response.body.password
    );

    expect(response.status).toBe(200);
    expect(pwdCheck).toBe(true);
  });

  it("gets /auth: returns a token if the username/password combination is valid", async () => {
    const response = await request
      .get("/auth")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ username: userList[0].username, password: userList[0].password });

    expect(response.status).toBe(200);
  });

  it("gets /auth: returns an error message if the username/password combination is not valid", async () => {
    const response = await request
      .get("/auth")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ username: userList[0].username, password: "test" });

    expect(response.status).toBe(200);
  });
});
