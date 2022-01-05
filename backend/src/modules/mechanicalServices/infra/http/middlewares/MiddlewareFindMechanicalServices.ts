import { Request, Response } from 'express';
import MechanicalService from '../../typeorm/entities/MechanicalService';

interface IQuery {
  (name?: string): Promise<MechanicalService[] | undefined>;
}
export default (fn: IQuery) => {
  return async function MiddlewareFindMechanicalServices(
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
