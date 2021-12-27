import { inject, injectable } from 'tsyringe';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUser from '../dtos/ICreateUser';
import User from '../infra/typeorm/entities/User';
import ICryptProvider from '@shared/container/providers/CryptProvider/models/ICryptProvider';
import IJwtProvider from '@shared/container/providers/JwtProvider/models/IJwtProvider';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LogProvider')
    private log: ILogProvider,
    @inject('CryptProvider')
    private crypt: ICryptProvider,
    @inject('JwtProvider')
    private jwt: IJwtProvider,
  ) {}

  public async execute({
    email,
    password,
    name,
    phone,
    role_id,
    active,
  }: ICreateUser): Promise<User | undefined> {
    try {
      if (!email || !password || !name || !phone || !role_id) {
        throw new AppError(
          'Incomplete data for creating a new user, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          email,
          password,
          name,
          phone,
          role_id,
          active,
        },
      });
      const hasUser = await this.userRepository.findOne({ email });

      this.log.INFO({
        message: 'userRepository.findOne',
        result: {
          user: JSON.stringify(hasUser),
        },
      });

      if (hasUser) {
        throw new AppError('User already exists');
      }

      const hash = this.crypt.encrypt({
        data: password,
      });

      const newUser: User = await this.userRepository.save({
        email,
        password: hash,
        name,
        phone,
        role_id: role_id,
        active,
      });

      this.log.INFO({
        message: 'userRepository.save',
        result: {
          user: JSON.stringify(newUser),
        },
      });

      return newUser;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
