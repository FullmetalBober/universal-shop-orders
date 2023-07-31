import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xcc from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import path from 'path';
import globalErrorHandler from './middlewares/errorMiddleware';
import AppError from './utils/appError';

import userRouter from './routes/userRoutes';
import categoryRouter from './routes/categoryRoutes';
import productRouter from './routes/productRoutes';
import basketRouter from './routes/basketRoutes';
import orderRouter from './routes/orderRoutes';

const app = express();

app.enable('trust proxy');

app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(express.static('public'));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xcc());

app.use(hpp());

app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/baskets', basketRouter);
app.use('/api/v1/orders', orderRouter);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
