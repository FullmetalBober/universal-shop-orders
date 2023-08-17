import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import env from './env';

process.on('uncaughtException', err => {
  console.error(
    'UNCAUGHT EXCEPTION! 💥 Shutting down...\n',
    err.name,
    err.message
  );
  process.exit(1);
});

const DB: string = env.DATABASE.replace('<PASSWORD>', env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    retryWrites: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = env.PORT;
const server: Server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(
    'UNHANDLED REJECTION! 💥 Shutting down...\n',
    err.name,
    err.message
  );
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
