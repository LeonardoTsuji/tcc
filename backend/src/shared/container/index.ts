import { container } from 'tsyringe';

import './providers';

import RoleRepository from '@modules/roles/infra/typeorm/repositories/RoleRepository';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import IModelRepository from '@modules/models/repositories/IModelRepository';
import ModelRepository from '@modules/models/infra/typeorm/repositories/ModelRepository';

import IBrandRepository from '@modules/brands/repositories/IBrandRepository';
import BrandRepository from '@modules/brands/infra/typeorm/repositories/BrandRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);
container.registerSingleton<IModelRepository>(
  'ModelRepository',
  ModelRepository,
);
container.registerSingleton<IBrandRepository>(
  'BrandRepository',
  BrandRepository,
);
