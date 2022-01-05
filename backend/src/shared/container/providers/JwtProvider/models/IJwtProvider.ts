import { AxiosRequestHeaders } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IEncrypt {
  data: string;
  saltOrRounds: string | number;
}
export interface IDecrypt {
  data: string;
  encrypted: string;
}

export default interface IJwtProvider {
  generate(payload: any): string;
  generateRefresh(payload: any): string;
  verifyRefresh(token: string): string | JwtPayload;
  getTokenFromHeaders(headers: AxiosRequestHeaders): string | undefined;
}
