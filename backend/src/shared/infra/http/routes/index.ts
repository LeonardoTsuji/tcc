import { Router } from 'express';

import HealthcheckController from '../controllers/HealthcheckController';

import roleRouter from '@modules/roles/infra/http/routes/role.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import authRouter from '@modules/auth/infra/http/routes/auth.routes';

const router = Router();

const healthcheckController = new HealthcheckController();

router.use('/healthcheck', healthcheckController.create);
router.use('/role', roleRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
