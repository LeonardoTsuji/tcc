import { DeepPartial } from 'typeorm';
import Role from '../infra/typeorm/entitites/Role';

export default interface IRoleRepository {
  save(usuario: Role): Promise<Role>;
  create(usuario: Role): Promise<Role | undefined>;
  update(id: number, partial: DeepPartial<Role>): Promise<Role>;
  findById(id: number): Promise<Role | undefined>;
  findAll(): Promise<Role[]>;
  delete(id: number): Promise<void>;
}
