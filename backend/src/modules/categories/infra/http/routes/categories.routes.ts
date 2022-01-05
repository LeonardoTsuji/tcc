import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import MiddlewareFindCategories from '../middlewares/MiddlewareFindCategories';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePostRequest(categoryController.create),
);
categoryRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindCategories(categoryController.show),
);
categoryRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(categoryController.index),
);
categoryRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePatchRequest(categoryController.update),
);
categoryRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(categoryController.delete),
);

export default categoryRouter;
