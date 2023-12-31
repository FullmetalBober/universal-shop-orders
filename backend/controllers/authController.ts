import { RequestHandler, Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import AppError from '../utils/appError';
import Email from '../utils/email';
import { IUser } from '../models/userModel';
import env from '../env';
import { createCookie, removeCookie } from '../utils/cookie';

const signToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);

  res = createCookie(res, token);

  user.password = undefined!;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup: RequestHandler = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const activateToken = newUser.createResetToken('emailActivate');
  await newUser.save({ validateBeforeSave: false });

  let url = `${req.protocol}://${req.headers.host}/api/v1/users/activate/${activateToken}`;
  if (req.headers.origin)
    url = `${req.headers.origin}/auth/verify/${activateToken}`;

  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
};

export const activateUser: RequestHandler = async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailActivateToken: hashedToken,
  });

  if (!user) {
    return next(new AppError('Token is invalid', 400));
  }
  user.verified = true;
  user.emailActivateToken = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully',
  });
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError(
        'Будь ласка, вкажіть адресу електронної пошти та пароль!',
        400
      )
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password!))) {
    return next(new AppError('Неправильна електрона пошта або пароль', 401));
  }

  createSendToken(user, 200, req, res);
};

export const logout: RequestHandler = (req, res) => {
  res = removeCookie(res);

  res.status(200).json({ status: 'success' });
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Немає користувача з електронною адресою.', 404));
  }

  const resetToken = user.createResetToken('passwordReset');
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  const user = await User.findById(req.user?.id).select('+password');

  if (!user) return next(new AppError('User not found', 404));

  const passwordCurrent = req.body.passwordCurrent || '';
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
};
