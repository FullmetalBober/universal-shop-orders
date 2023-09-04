import { RequestHandler } from 'express';
import User from '../models/userModel';
import AppError from '../utils/appError';
import * as factory from './handlerFactory';
import { removeCookie } from '../utils/cookie';
// const CloudinaryStorage = require('../utils/cloudinary');

export const getUser = factory.getOne(User);
export const getAllUsers = factory.getAll(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);

const filterObj = (obj: any, ...allowedFields: string[]) => {
  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getMe: RequestHandler = (req, res, next) => {
  req.params.id = req.user?.id;
  next();
};

export const updateMe: RequestHandler = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  const updatedUser = await User.findByIdAndUpdate(req.user?.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};

export const deleteMe: RequestHandler = async (req, res, next) => {
  await User.findByIdAndDelete(req.user?.id);

  res = removeCookie(res);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
