import { Router } from 'express';
import RoleController from '../controllers/RoleController';

const roleRouter = Router();
const roleController = new RoleController();

export default roleRouter;
