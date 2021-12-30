import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateUser from '../dtos/IUpdateUser';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
    email,
    phone,
    role_id,
    active,
    id,
  }: IUpdateUser): Promise<User | undefined> {
    try {
      const userFound = await this.userRepository.findOne({ email });

      if (!userFound) throw new AppError('User not found!', 404);

      if (userFound.email != email)
        throw new AppError('Email already exists!', 400);

      const userUpdated = await this.userRepository.update(userFound.id, {
        name,
        email,
        phone,
        role_id,
        active,
      });

      return userUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
