import { Request, Response } from 'express';
import Category from '../../typeorm/entities/Category';

interface IQuery {
  (name?: string): Promise<Category[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindCategories(
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
