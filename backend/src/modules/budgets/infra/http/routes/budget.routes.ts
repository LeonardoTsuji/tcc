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
      name: Joi.string().required(),
    },
  }),
  MiddlewarePostRequest(budgetController.create),
);
budgetRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindBudgets(budgetController.show),
);
budgetRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(budgetController.index),
);
budgetRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePatchRequest(budgetController.update),
);
budgetRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(budgetController.delete),
);

export default budgetRouter;
