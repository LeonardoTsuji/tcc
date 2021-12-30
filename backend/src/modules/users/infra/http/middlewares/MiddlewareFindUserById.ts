import { Request, Response } from 'express';
import User from '../../typeorm/entities/User';

interface IQuery {
  (email?: string): Promise<User | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindUserById(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { email } = request.query;
    const result = await fn(email?.toString());
    if (response) {
      return response.json(result);
    }
  };
};
