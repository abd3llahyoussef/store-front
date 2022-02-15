import express, { Request, Response } from "express";
import { order, orderStore } from "../models/order";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new orderStore();

const create = async (req: Request, res: Response) => {
  try {
    const orders = req.body.userId;
    const ordersInfo = await store.create(orders);
    res.json(ordersInfo);
  } catch (err) {
    res.send(500).send(err);
  }
};

const getCompletedOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const ordersInfo = await store.getCompletedOrders(userId);
    res.json(ordersInfo);
  } catch (err) {
    res.send(500).send(err);
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
const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyauth, create);
  app.get("/orders/:id", verifyauth, getCompletedOrders);
};

export default orderRoutes;
