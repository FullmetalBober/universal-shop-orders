import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
  NODE_ENV: str({ default: 'development' }),
  DATABASE: str(),
  DATABASE_PASSWORD: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str(),
  JWT_COOKIE_NAME: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  EMAIL_FROM_ADDRESS: str(),
  EMAIL_FROM_NAME: str(),
  MAILTRAP_USERNAME: str(),
  MAILTRAP_PASSWORD: str(),
  SENDGRID_USERNAME: str(),
  SENDGRID_PASSWORD: str(),
  GMAIL_USERNAME: str(),
  GMAIL_PASSWORD: str(),
});

export default env;
