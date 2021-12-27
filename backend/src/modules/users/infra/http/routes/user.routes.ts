import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';
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
      roleId: Joi.number().required(),
    },
  }),
  userController.create,
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

export default userRouter;
