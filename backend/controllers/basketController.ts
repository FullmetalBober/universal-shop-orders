import { RequestHandler } from 'express';
import Basket from '../models/basketModel';
import AppError from '../utils/appError';

// export const getAllBaskets = factory.getAll(Basket);
// export const getBasket = factory.getOne(Basket);
// export const createBasket = factory.createOne(Basket);
// export const updateBasket = factory.updateOne(Basket);
// export const deleteBasket = factory.deleteOne(Basket);

export const getBasketByUser: RequestHandler = async (req, res, next) => {
  let query = Basket.findOne(req.body);

  if (req.query.populate)
    query = query.populate(
      'products.product',
      'name price imageCover stock characteristics slug'
    );
  let doc = await query;

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

export const updateMyBasket: RequestHandler = async (req, res, next) => {
  const doc = await Basket.findOneAndUpdate(
    {
      user: req.user?.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};
