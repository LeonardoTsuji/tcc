import { Request, Response } from 'express';
import Brand from '../../typeorm/entities/Brand';

interface IQuery {
  (name?: string): Promise<Brand[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindBrands(
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
