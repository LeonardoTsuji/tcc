import jwtConfig from '@config/jwt';
import { AxiosRequestHeaders } from 'axios';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import IJwtProvider from '../models/IJwtProvider';

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
  verifyRefresh(token: string): string | JwtPayload {
    return jwt.verify(token, refreshTokenPrivateKey);
  }
  getTokenFromHeaders(headers: AxiosRequestHeaders): string | undefined {
    let token = headers['authorization'];

    return token ? token.slice(7, token.length) : undefined;
  }
}
