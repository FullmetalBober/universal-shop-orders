import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel';
import AppError from '../utils/appError';

export const protect: RequestHandler = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await (promisify as any)(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat!)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

export const setUserId: RequestHandler = (req, res, next) => {
  req.body.user = req.user?.id;
  req.query.user = req.user?.id;
  next();
};
