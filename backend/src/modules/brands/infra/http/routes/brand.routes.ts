import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import BrandController from '../controllers/BrandController';
import MiddlewareFindBrands from '../middlewares/MiddlewareFindBrands';

const brandRouter = Router();
const brandController = new BrandController();

brandRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePostRequest(brandController.create),
);
brandRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindBrands(brandController.show),
);
brandRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(brandController.index),
);
brandRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePatchRequest(brandController.update),
);
brandRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(brandController.delete),
);

export default brandRouter;
