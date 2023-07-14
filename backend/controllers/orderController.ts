import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import * as factory from './handlerFactory';
import Order from '../models/orderModel';
import Basket from '../models/basketModel';
import Product from '../models/productModel';
import AppError from '../utils/appError';

export const getAllOrders = factory.getAll(Order);
export const getOrder = factory.getOne(Order);
export const createOrder = factory.createOne(Order);
export const updateOrder = factory.updateOne(Order);

export const createOrderFromBasket: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { user } = req;

  const basket = await Basket.findOneAndDelete(
    { user: user?._id },
    { session }
  ).populate('products.product');
  if (!basket) return next(new AppError('Basket not found', 404));

  const products = basket.products.map(item => ({
    product: item.product?._id,
    quantity: item.quantity,
    price: (item.product as any).price,
  }));

  const order = await Order.create([{ user: user?._id, products }], {
    session,
  });

  await session.commitTransaction();
  session.endSession();

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
};

const updateStock = async (
  order: any,
  action: number,
  session: mongoose.mongo.ClientSession
) => {
  const products = order.products;

  const updates = products.map((item: any) => ({
    updateOne: {
      filter: { _id: item.product },
      update: { $inc: { stock: item.quantity * action } },
    },
  }));

  await Product.bulkWrite(updates, { session });
};

export const setStatus: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError('Order not found', 404));

  const status = order?.status;
  order!.status = req.body.status;

  await order?.save({ session });

  if (status === 'pending' && req.body.status === 'processing')
    await updateStock(order, -1, session);

  if (status === 'processing' && req.body.status === 'cancelled')
    await updateStock(order, 1, session);

  await session.commitTransaction();
  session.endSession();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
};
