import MiddlewareDeleteRequest from '@shared/infra/http/middlewares/MiddlewareDeleteRequest';
import MiddlewarePatchRequest from '@shared/infra/http/middlewares/MiddlewarePatchRequest';
import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import MiddlewareFindUserById from '../middlewares/MiddlewareFindUserById';
import MiddlewareFindUsers from '../middlewares/MiddlewareFindUsers';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      role_id: Joi.number().required(),
    },
  }),
  MiddlewarePostRequest(userController.create),
);
userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      role: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindUsers(userController.show),
);
userRouter.get(
  '/:id',
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string().allow('', null),
    },
  }),
  MiddlewareFindUserById(userController.index),
);
userRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      email: Joi.string().allow('', null),
      password: Joi.string().allow('', null),
      name: Joi.string().allow('', null),
      phone: Joi.string().allow('', null),
      role_id: Joi.number().required(),
      id: Joi.number().allow('', null),
      active: Joi.boolean().allow('', null),
    },
  }),
  MiddlewarePatchRequest(userController.update),
);
userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      email: Joi.string().allow('', null),
    },
  }),
  MiddlewareDeleteRequest(userController.delete),
);

export default userRouter;
