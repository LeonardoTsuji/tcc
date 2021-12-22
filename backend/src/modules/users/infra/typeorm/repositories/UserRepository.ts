import { DeepPartial, getRepository, Like, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '../entitites/User';
import IFindAllUser from '@modules/users/dtos/IFindAllUser';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async save(user: User): Promise<User> {
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
    const role = data.role || '';

    return this.ormRepository.find({
      active: true,
      role: {
        name: Like(`%${role}%`),
      },
    });
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

    const usuarioToSave = this.ormRepository.merge(user, partial);
    return this.ormRepository.save(usuarioToSave);
  }

  public async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.active = false;

    await this.ormRepository.update(user.id, user);
  }
}
