import { RequestHandler } from 'express';
import Product from '../models/productModel';
import * as factory from './handlerFactory';

const queryParam = 'characteristics';

export const getAllProducts = factory.getAll(Product);
export const getProduct = factory.getOne(Product);
export const createProduct = factory.createOne(Product);
export const updateProduct = factory.updateOne(Product);
export const deleteProduct = factory.deleteOne(Product);

export const queryParamToFilterObj: RequestHandler = (req, res, next) => {
  if (!req.query[queryParam]) return next();
  const obj = JSON.parse(req.query[queryParam] as string);
  const query = {
    $elemMatch: {
      $or: obj,
    },
  };
  req.query[queryParam] = query;

  next();
};
