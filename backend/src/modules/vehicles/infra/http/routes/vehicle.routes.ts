import verify from '@modules/auth/infra/http/middlewares/verifyToken';
import JsonWebTokenProvider from '@shared/container/providers/JwtProvider/implementations/JsonWebTokenProvider';
import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewareGetByIdRequest from '@shared/infra/http/middlewares/MiddlewareGetByIdRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import VehicleController from '../controllers/VehicleController';
import MiddlewareFindVehicles from '../middlewares/MiddlewareFindVehicles';

const vehicleRouter = Router();
const vehicleController = new VehicleController();

vehicleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      plate: Joi.string().required(),
      color: Joi.string().required(),
      year: Joi.number().required(),
      kilometer: Joi.number().required(),
      brand_id: Joi.number().required(),
      model_id: Joi.number().required(),
      user_id: Joi.number().allow(null, ''),
    },
  }),
  verify,
  MiddlewarePostRequest(vehicleController.create),
);
vehicleRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  verify,
  MiddlewareFindVehicles(vehicleController.show),
);
vehicleRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  verify,
  MiddlewareGetByIdRequest(vehicleController.index),
);
vehicleRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      plate: Joi.string().allow(null, ''),
      color: Joi.string().allow(null, ''),
      year: Joi.number().allow(null, ''),
      kilometer: Joi.number().allow(null, ''),
      brand_id: Joi.number().allow(null, ''),
      model_id: Joi.number().allow(null, ''),
      user_id: Joi.number().allow(null, ''),
    },
  }),
  verify,
  MiddlewarePatchRequest(vehicleController.update),
);
vehicleRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  verify,
  MiddlewareDeleteRequest(vehicleController.delete),
);

export default vehicleRouter;
