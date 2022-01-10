import { Request, Response } from 'express';
import Schedule from '../../typeorm/entities/Schedule';

interface IQuery {
  (status?: string): Promise<Schedule[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindSchedules(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { status } = request.query;
    const result = await fn(status?.toString());
    if (response) {
      return response.json(result);
    }
  };
};
