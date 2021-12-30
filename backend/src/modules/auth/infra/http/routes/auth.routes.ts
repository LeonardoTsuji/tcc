import MiddlewarePostRequest from '@shared/infra/http/middlewares/MiddlewarePostRequest';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import MiddlewareUpdatePassword from '../middlewares/MiddlewareUpdatePassword';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().allow(null, ''),
      password: Joi.string().allow(null, ''),
      grant_type: Joi.string().allow(null, ''),
      refresh_token: Joi.string().allow(null, ''),
    },
  }),
  MiddlewarePostRequest(authController.login),
);

authRouter.put(
  '/update-password',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
    },
  }),
  MiddlewareUpdatePassword(authController.update),
);

authRouter.put(
  '/forgot-password',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  MiddlewarePostRequest(authController.forgot),
);

export default authRouter;
