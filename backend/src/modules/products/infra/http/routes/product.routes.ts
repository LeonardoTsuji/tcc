import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import MiddlewareFindProducts from '../middlewares/MiddlewareFindProducts';

const productRouter = Router();
const productController = new ProductController();

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category_id: Joi.number().required(),
      brand_id: Joi.number().required(),
    },
  }),
  MiddlewarePostRequest(productController.create),
);
productRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindProducts(productController.show),
);
productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(productController.index),
);
productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category_id: Joi.number().required(),
      brand_id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(productController.update),
);
productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(productController.delete),
);

export default productRouter;
