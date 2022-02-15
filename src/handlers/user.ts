import express, { Request, Response } from "express";
import { user, userStore } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new userStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.send(500).send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const users = await store.show(id);
    res.json(users);
  } catch (err) {
    res.send(500).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const userCreation: user = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const products = await store.create(userCreation);
    res.json(products);
  } catch (err) {
    res.send(500).send(err);
  }
};
const auth = async (req: Request, res: Response) => {
  const user: user = req.body.username;
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err}+${user}`);
  }
};
const verifyauth = async (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";
    const encoded = jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};
const addProduct = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);
  const productId: number = req.body.productId;
  const quantity: number = req.body.quantity;
  try {
    const addedProduct = await store.addProduct(quantity, userId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const User_routes = (app: express.Application) => {
  app.get("/users", verifyauth, index);
  app.get("/users/:id", verifyauth, show);
  app.post("/users", verifyauth, create);
  app.post("/users/:id/add-product-to-order", verifyauth, addProduct);
};
export default User_routes;
