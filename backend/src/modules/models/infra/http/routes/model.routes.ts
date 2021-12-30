import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ModelController from '../controllers/ModelController';
import MiddlewareFindModels from '../middlewares/MiddlewareFindModels';

const modelRouter = Router();
const modelController = new ModelController();

modelRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      model: Joi.string().required(),
      brand_id: Joi.number().required(),
    },
  }),
  MiddlewarePostRequest(modelController.create),
);
modelRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      brand_id: Joi.number().allow('', null),
    },
  }),
  MiddlewareFindModels(modelController.show),
);
modelRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(modelController.index),
);
modelRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      model: Joi.string().allow('', null),
      brand_id: Joi.number().allow('', null),
    },
  }),
  MiddlewarePatchRequest(modelController.update),
);
modelRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(modelController.delete),
);

export default modelRouter;
