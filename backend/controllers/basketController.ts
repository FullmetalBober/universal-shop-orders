import { RequestHandler } from 'express';
import Basket from '../models/basketModel';
import * as factory from './handlerFactory';

// export const getAllBaskets = factory.getAll(Basket);
// export const getBasket = factory.getOne(Basket);
export const createBasket = factory.createOne(Basket);
export const updateBasket = factory.updateOne(Basket);
export const deleteBasket = factory.deleteOne(Basket);

export const getBasketByUser: RequestHandler = async (req, res, next) => {
  let doc = await Basket.findOne(req.body);

  if (!doc) {
    doc = await Basket.create(req.body);
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};
