import { Response } from 'express';
import ms from 'ms';
import env from '../env';

const tokenChecker = (tokenName: string) => `${tokenName}-checker`;
const tokenCheck = '≽^•⩊•^≼';

export const createCookie = (res: Response, token: string) => {
  return () => {
    const cookieName = env.JWT_COOKIE_NAME;
    const jwtExpires = env.JWT_EXPIRES_IN;
    const expiresIn = new Date(Date.now() + ms(jwtExpires));

    res.cookie(cookieName, token, {
      expires: expiresIn,
      httpOnly: true,
      secure: true,
      // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    res.cookie(tokenChecker(cookieName), expiresIn, {
      expires: expiresIn,
    });
  };
};

export const removeCookie = (res: Response) => {
  return () => {
    const cookieName = env.JWT_COOKIE_NAME;
    const expires = new Date(-1);

    res.cookie(cookieName, 'loggedOut', {
      expires,
      httpOnly: true,
    });
    res.cookie(tokenChecker(cookieName), tokenCheck, {
      expires,
    });
  };
};
