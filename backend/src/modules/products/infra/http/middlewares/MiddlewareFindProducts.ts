import { Request, Response } from 'express';
import Product from '../../typeorm/entities/Product';

interface IQuery {
  (name?: string): Promise<Product[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindProducts(
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
