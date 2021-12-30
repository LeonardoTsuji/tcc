import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDeleteUser from '../dtos/IDeleteUser';
import IUpdateUser from '../dtos/IUpdateUser';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ email }: IDeleteUser): Promise<User | undefined> {
    try {
      const userFound = await this.userRepository.findOne({ email });

      if (!userFound) throw new AppError('User not found!', 404);

      const userDeleted = await this.userRepository.delete(userFound.id);

      return userDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
