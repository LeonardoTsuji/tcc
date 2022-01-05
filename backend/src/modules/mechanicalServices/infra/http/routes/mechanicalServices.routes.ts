import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import MechanicalServiceController from '../controllers/MechanicalServiceController';
import MiddlewareFindMechanicalServices from '../middlewares/MiddlewareFindMechanicalServices';

const mechanicalServiceRouter = Router();
const mechanicalServiceController = new MechanicalServiceController();

mechanicalServiceRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  MiddlewarePostRequest(mechanicalServiceController.create),
);
mechanicalServiceRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindMechanicalServices(mechanicalServiceController.show),
);
mechanicalServiceRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(mechanicalServiceController.index),
);
mechanicalServiceRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(mechanicalServiceController.update),
);
mechanicalServiceRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(mechanicalServiceController.delete),
);

export default mechanicalServiceRouter;
