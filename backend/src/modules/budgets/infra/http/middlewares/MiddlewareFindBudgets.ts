import { Request, Response } from 'express';
import Budget from '../../typeorm/entities/Budget';

interface IQuery {
  (name?: string): Promise<Budget[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindBudgets(
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
