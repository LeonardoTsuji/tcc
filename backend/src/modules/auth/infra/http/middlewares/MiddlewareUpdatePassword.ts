import User from '@modules/users/infra/typeorm/entities/User';
import { Request, Response } from 'express';

interface IParams {
  (data: any, id: number): Promise<User | undefined>;
}
export default (fn: IParams) => {
  return async function MiddlewareUpdatePassword(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const result = await fn(request.body, request.userId);
    if (response) {
      return response.json(result);
    }
  };
};
