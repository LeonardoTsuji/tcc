import { Request, Response } from 'express';
import Vehicle from '../../typeorm/entities/Vehicle';

interface IQuery {
  (userId: number, name?: string): Promise<Vehicle[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindVehicles(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { name } = request.query;
    const result = await fn(request.userId, name?.toString());
    if (response) {
      return response.json(result);
    }
  };
};
