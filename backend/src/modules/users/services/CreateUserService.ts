import { inject, injectable } from 'tsyringe';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUser from '../dtos/ICreateUser';
import User from '../infra/typeorm/entitites/User';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    email,
    password,
    name,
    phone,
    roleId,
    active,
  }: ICreateUser): Promise<User | undefined> {
    try {
      if (!email || !password || !name || !phone || !roleId) {
        throw new AppError(
          'Dados incompletos para a criação de um novo usuário, por favor validar e tentar novamente.',
        );
      }

      const hasUser = await this.userRepository.findOne({ email });

      if (hasUser) {
        throw new AppError('Usuário já cadastrado');
      }

      const user: User = await this.userRepository.save({
        email,
        password,
        name,
        phone,
        roleId,
        active,
      });

      return user;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
