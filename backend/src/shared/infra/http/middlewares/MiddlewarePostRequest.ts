/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';

export default (fn: any) => {
  return async function MiddlewarePostRequest(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const result = await fn(request.body, request.userId);
    if (response) {
      return response.json(result);
    }
  };
};
