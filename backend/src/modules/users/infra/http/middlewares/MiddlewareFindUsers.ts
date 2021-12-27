import { Request, Response } from 'express';
import User from '../../typeorm/entities/User';

interface IQuery {
  (role?: string): Promise<User[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindUsers(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { role } = request.query;
    const result = await fn(role?.toString());
    if (response) {
      return response.json(result);
    }
  };
};
