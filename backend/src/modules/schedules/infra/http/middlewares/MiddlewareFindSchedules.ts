import { Request, Response } from 'express';
import Schedule from '../../typeorm/entities/Schedule';

interface IQuery {
  (name?: string): Promise<Schedule[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindSchedules(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { name } = request.query;
    const result = await fn(name?.toString());
    if (response) {
      return response.json(result);
    }
  };
};
