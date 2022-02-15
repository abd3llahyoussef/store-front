import express, { Request, Response } from "express";
import { product, productStore } from "../models/product";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new productStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.send(500).send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const products = await store.show(id);
    res.json(products);
  } catch (err) {
    res.send(500).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const productCreation: product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const products = await store.create(productCreation);
    res.json(products);
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
const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyauth, create);
};
export default productRoutes;
