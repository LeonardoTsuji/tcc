/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';

interface IParams {
  (id: number, data: any, frotista_id: number): Promise<any>;
}
export default (fn: IParams) => {
  return async function MiddlewarePatchRequest(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { id } = request.params;
    const result = await fn(Number(id), request.body, request.user.frotista_id);
    if (response) {
      return response.json(result);
    }
  };
};
