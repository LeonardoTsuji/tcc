import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';
import MiddlewareFindSchedules from '../middlewares/MiddlewareFindSchedules';

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePostRequest(scheduleController.create),
);
scheduleRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindSchedules(scheduleController.show),
);
scheduleRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  MiddlewarePatchRequest(scheduleController.index),
);
scheduleRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  MiddlewarePatchRequest(scheduleController.update),
);
scheduleRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  MiddlewareDeleteRequest(scheduleController.delete),
);

export default scheduleRouter;
