import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email?: string;
}

@injectable()
export default class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<User | undefined> {
    try {
      return this.userRepository.findOne({ email });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
