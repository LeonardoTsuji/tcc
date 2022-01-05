import { container } from 'tsyringe';

import './providers';

import RoleRepository from '@modules/roles/infra/typeorm/repositories/RoleRepository';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';

import IMechanicalServiceRepository from '@modules/mechanicalServices/repositories/IMechanicalServiceRepository';
import MechanicalServiceRepository from '@modules/mechanicalServices/infra/typeorm/repositories/MechanicalServiceRepository';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import IModelRepository from '@modules/models/repositories/IModelRepository';
import ModelRepository from '@modules/models/infra/typeorm/repositories/ModelRepository';

import IBrandRepository from '@modules/brands/repositories/IBrandRepository';
import BrandRepository from '@modules/brands/infra/typeorm/repositories/BrandRepository';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import CategoryRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

import IBudgetRepository from '@modules/budgets/repositories/IBudgetRepository';
import BudgetRepository from '@modules/budgets/infra/typeorm/repositories/BudgetRepository';

import IVehicleRepository from '@modules/vehicles/repositories/IVehicleRepository';
import VehicleRepository from '@modules/vehicles/infra/typeorm/repositories/VehicleRepository';

import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import ScheduleRepository from '@modules/schedules/infra/typeorm/repositories/ScheduleRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IMechanicalServiceRepository>(
  'MechanicalServiceRepository',
  MechanicalServiceRepository,
);
container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);
container.registerSingleton<IModelRepository>(
  'ModelRepository',
  ModelRepository,
);
container.registerSingleton<IBrandRepository>(
  'BrandRepository',
  BrandRepository,
);
container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
container.registerSingleton<IBudgetRepository>(
  'BudgetRepository',
  BudgetRepository,
);
container.registerSingleton<IVehicleRepository>(
  'VehicleRepository',
  VehicleRepository,
);
container.registerSingleton<IScheduleRepository>(
  'ScheduleRepository',
  ScheduleRepository,
);
