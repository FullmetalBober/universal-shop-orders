import { RequestHandler } from 'express';
import * as factory from './handlerFactory';
import Order from '../models/orderModel';
import Basket from '../models/basketModel';

export const getAllOrders = factory.getAll(Order);
export const getOrder = factory.getOne(Order);
export const updateOrder = factory.updateOne(Order);

export const createOrder: RequestHandler = async (req, res, next) => {
  const { user } = req;

  const basket = await Basket.findOne({ user: user?._id }).populate(
    'products.product'
  );

  if (!basket) return next(new Error('Basket not found'));

  const products = basket.products.map(item => ({
    name: item.product?._id,
    quantity: item.quantity,
    price: (item.product as any).price,
  }));

  const order = await Order.create({ user: user?._id, products });

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
};
