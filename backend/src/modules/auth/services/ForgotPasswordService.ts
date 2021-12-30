import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICryptProvider from '@shared/container/providers/CryptProvider/models/ICryptProvider';
import IJwtProvider from '@shared/container/providers/JwtProvider/models/IJwtProvider';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
}

@injectable()
export default class ForgotPasswordService {
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

  public async execute({ email }: IRequest): Promise<User | undefined> {
    try {
      this.log.INFO({
        message: 'Init ForgotPasswordService execute',
        params: {
          email,
        },
      });

      const user = await this.userRepository.findOne({ email });

      if (!user) throw new AppError('User not found');

      const randomNumber = Math.floor(Math.random() * 100000 + 1);
      const hash = this.crypt.encrypt({ data: randomNumber.toString() });
      const token = this.jwt.generate({ id: user.id });

      const refreshToken = this.jwt.generateRefresh({
        id: user.id,
      });

      this.log.INFO({
        message: 'ramdomNumber',
        params: {
          randomNumber,
        },
      });

      const userUpdated = await this.userRepository.update(user.id, {
        password: hash,
      });

      return userUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
