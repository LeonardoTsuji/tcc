import { AxiosRequestHeaders } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ParsedQs } from 'qs';
import IJwtProvider from '../models/IJwtProvider';
import jwtConfig from '@config/jwt';

const tokenPrivateKey = jwtConfig.token;
const refreshTokenPrivateKey = jwtConfig.refreshToken;

const options: SignOptions = {
  expiresIn: '30d',
};
const refreshOptions = {
  expiresIn: '60d',
};

export default class JsonWebTokenProvider implements IJwtProvider {
  generate(payload: any): string {
    return jwt.sign(payload, tokenPrivateKey, options);
  }
  generateRefresh(payload: any): string {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
  }
  verify(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ) {
    const token = req.headers['authorization'];
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: 'Any token was provided' });

    const bearer = token.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, jwtConfig.token, function (err, decoded) {
      if (err)
        return res.status(401).json({ auth: false, message: 'Invalid token!' });

      req.userId = decoded!.id;
      next();
    });
  }
  verifyRefresh(token: string): string | JwtPayload {
    return jwt.verify(token, refreshTokenPrivateKey);
  }
  getTokenFromHeaders(headers: AxiosRequestHeaders): string | undefined {
    let token = headers['authorization'];

    return token ? token.slice(7, token.length) : undefined;
  }
}
