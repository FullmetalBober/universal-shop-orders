import AppError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError, CastError } from 'mongoose';
import { MongoServerError } from 'mongodb';
import env from '../env';

type ValidationError = MongooseError.ValidationError;

const handleCastErrorDB = (err: CastError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoServerError): AppError => {
  const value = Object.values(err.keyValue);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ValidationError): AppError => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (env.NODE_ENV === 'production') {
    let error:
      | AppError
      | CastError
      | MongooseError
      | ValidationError
      | MongoServerError = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === 'CastError')
      error = handleCastErrorDB(error as CastError);
    if ((error as MongoServerError).code === 11000)
      error = handleDuplicateFieldsDB(error as MongoServerError);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error as ValidationError);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error as AppError, req, res);
  }
};

export default errorMiddleware;
