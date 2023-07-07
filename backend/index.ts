import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'http';
import app from './app';

process.on('uncaughtException', err => {
  console.error(
    'UNCAUGHT EXCEPTION! 💥 Shutting down...\n',
    err.name,
    err.message
  );
  process.exit(1);
});

dotenv.config();

const DB: string = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!
);

mongoose
  .connect(DB, {
    retryWrites: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
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
