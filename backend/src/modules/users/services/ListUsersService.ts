import { inject, injectable } from 'tsyringe';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUser from '../dtos/ICreateUser';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  role?: string;
}

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ role }: IRequest): Promise<User[] | undefined> {
    try {
      return this.userRepository.findAll({ role });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
