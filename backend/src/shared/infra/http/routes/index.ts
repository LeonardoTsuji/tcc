import { Router } from 'express';

import HealthcheckController from '../controllers/HealthcheckController';

import roleRouter from '@modules/roles/infra/http/routes/role.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import authRouter from '@modules/auth/infra/http/routes/auth.routes';
import modelRouter from '@modules/models/infra/http/routes/model.routes';
import brandRouter from '@modules/brands/infra/http/routes/brand.routes';
import categoryRouter from '@modules/categories/infra/http/routes/categories.routes';
import productRouter from '@modules/products/infra/http/routes/product.routes';
import mechanicalServiceRouter from '@modules/mechanicalServices/infra/http/routes/mechanicalServices.routes';
import budgetRouter from '@modules/budgets/infra/http/routes/budget.routes';
import scheduleRouter from '@modules/schedules/infra/http/routes/schedule.routes';
import vehicleRouter from '@modules/vehicles/infra/http/routes/vehicle.routes';

const router = Router();

const healthcheckController = new HealthcheckController();

router.use('/healthcheck', healthcheckController.create);
router.use('/role', roleRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/model', modelRouter);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/budget', budgetRouter);
router.use('/schedule', scheduleRouter);
router.use('/vehicle', vehicleRouter);
router.use('/mechanical-service', mechanicalServiceRouter);

export default router;
