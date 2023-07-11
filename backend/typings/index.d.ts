import express from 'express';

declare module 'xss-clean';
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
