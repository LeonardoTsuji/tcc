import { DeepPartial, getRepository, Like, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '../entities/User';
import IFindAllUser from '@modules/users/dtos/IFindAllUser';
import ICreateUser from '@modules/users/dtos/ICreateUser';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async save(user: ICreateUser): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create(user: User): Promise<User> {
    const newUser = this.ormRepository.create(user);
    await this.ormRepository.save(newUser);
    return newUser;
  }

  public async findOne(data: IFindAllUser): Promise<User | undefined> {
    const email = data.email || '';
    const user = await this.ormRepository.findOne({
      active: true,
      email: Like(`%${email}%`),
    });
    return user;
  }

  public async findAll(data: IFindAllUser): Promise<User[]> {
    const role = data.role;

    const usersQuery = this.ormRepository
      .createQueryBuilder('user')
      .innerJoin('user.role', 'role')
      .where('user.active = :active', {
        active: true,
      });

    if (role) {
      usersQuery.andWhere('role.id = :role', {
        role,
      });
    }

    return usersQuery.getMany();
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ active: true, id });
    return user;
  }

  async update(id: number, partial: DeepPartial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const userToSave = this.ormRepository.merge(user, partial);
    return this.ormRepository.save(userToSave);
  }

  public async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.active = false;

    return this.ormRepository.softRemove(user);
  }
}
