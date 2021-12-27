import { inject, injectable } from 'tsyringe';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import ICryptProvider from '@shared/container/providers/CryptProvider/models/ICryptProvider';
import IJwtProvider from '@shared/container/providers/JwtProvider/models/IJwtProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ILoginRequest from '../dtos/ILoginRequest';
import ILoginResponse from '../dtos/ILoginResponse';

@injectable()
export default class LoginService {
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
    grant_type,
    refresh_token,
  }: ILoginRequest): Promise<ILoginResponse | undefined> {
    try {
      if (!email || !password) {
        throw new AppError(
          'Incomplete data for login, please validate and try again.',
        );
      }

      const user = await this.userRepository.findOne({ email });

      if (!user) throw new AppError('User not found');

      const token = this.jwt.generate({ id: user.id });
      const refreshToken = this.jwt.generateRefresh({
        id: user.id,
      });

      return { token, refresh_token: refreshToken };
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
