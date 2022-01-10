import verify from '@modules/auth/infra/http/middlewares/verifyToken';
import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import BudgetController from '../controllers/BudgetController';
import MiddlewareFindBudgets from '../middlewares/MiddlewareFindBudgets';

const budgetRouter = Router();
const budgetController = new BudgetController();

budgetRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      expiration_date: Joi.date().required(),
      payment_method: Joi.string().allow(null, ''),
      status: Joi.string().allow(null, ''),
      products: Joi.array().required(),
      vehicle_id: Joi.number().required(),
      schedule_id: Joi.number().required(),
    },
  }),
  verify,
  MiddlewarePostRequest(budgetController.create),
);
budgetRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      status: Joi.string().allow('', null),
      user_id: Joi.number().allow('', null),
    },
  }),
  verify,
  MiddlewareFindBudgets(budgetController.show),
);
budgetRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  verify,
  MiddlewarePatchRequest(budgetController.index),
);
budgetRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      expiration_date: Joi.date().required(),
      payment_method: Joi.string().allow(null, ''),
      status: Joi.string().allow(null, ''),
      products: Joi.array().required(),
      vehicle_id: Joi.number().required(),
      schedule_id: Joi.number().required(),
    },
  }),
  verify,
  MiddlewarePatchRequest(budgetController.update),
);
budgetRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  verify,
  MiddlewareDeleteRequest(budgetController.delete),
);

export default budgetRouter;
