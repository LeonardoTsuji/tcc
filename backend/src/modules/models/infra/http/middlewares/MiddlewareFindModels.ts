import { Request, Response } from 'express';
import Model from '../../typeorm/entities/Model';

interface IQuery {
  (role_id?: number): Promise<Model[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindUsers(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { role_id } = request.query;
    const result = await fn(Number(role_id));
    if (response) {
      return response.json(result);
    }
  };
};
