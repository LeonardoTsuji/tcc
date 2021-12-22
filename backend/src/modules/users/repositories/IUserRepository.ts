import { DeepPartial } from 'typeorm';
import ICreateUser from '../dtos/ICreateUser';
import IFindAllUser from '../dtos/IFindAllUser';
import User from '../infra/typeorm/entitites/User';

export default interface IUserRepository {
  save(user: ICreateUser): Promise<User>;
  create(user: User): Promise<User | undefined>;
  update(id: number, partial: DeepPartial<User>): Promise<User>;
  findById(id: number): Promise<User | undefined>;
  findAll(data: IFindAllUser): Promise<User[]>;
  findOne(data: IFindAllUser): Promise<User | undefined>;
  delete(id: number): Promise<void>;
}
