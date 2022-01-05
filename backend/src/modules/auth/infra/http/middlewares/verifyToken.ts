import jwtConfig from '@config/jwt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verify(
  req: Request,
  res: Response,
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
