import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel';
import AppError from '../utils/appError';
import env from '../env';

export const protect: RequestHandler = async (req, res, next) => {
  const cookieName = env.JWT_COOKIE_NAME;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies[cookieName]) {
    token = req.cookies[cookieName];
  }

  if (!token) {
    return next(
      new AppError(
        'Ви не авторизовані! Будь ласка, увійдіть, щоб отримати доступ.',
        401
      )
    );
  }

  const decoded = await (promisify as any)(jwt.verify)(token, env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'Користувач, якому належить цей токен, більше не існує.',
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat!)) {
    return next(
      new AppError(
        'Користувач нещодавно змінив пароль! Будь ласка, увійдіть знову.',
        401
      )
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
