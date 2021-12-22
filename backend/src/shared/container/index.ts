import { container } from 'tsyringe';

import RoleRepository from '@modules/roles/infra/typeorm/repositories/RoleRepository';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);
