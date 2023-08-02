import { RequestHandler } from 'express';
import AppError from '../utils/appError';
import Product from '../models/productModel';
import * as factory from './handlerFactory';

const queryParam = 'characteristics';

export const getAllProducts = factory.getAll(Product);
export const getProduct = factory.getOne(Product);
export const getProductBySlug = factory.getOneBySlug(Product);
export const createProduct = factory.createOne(Product);
export const updateProduct = factory.updateOne(Product);
export const deleteProduct = factory.deleteOne(Product);
export const countProducts = factory.getCount(Product);

export const queryParamToFilterObj: RequestHandler = (req, res, next) => {
  if (!req.query[queryParam]) return next();
  try {
    const filter = JSON.parse(req.query[queryParam] as string);

    const query = {
      $all: filter.map((el: any) => ({
        $elemMatch: {
          $or: el,
        },
      })),
    };

    req.query[queryParam] = query;
  } catch (err) {
    return next(new AppError('Invalid filter query', 400));
  }

  next();
};
