import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICryptProvider from '@shared/container/providers/CryptProvider/models/ICryptProvider';
import IJwtProvider from '@shared/container/providers/JwtProvider/models/IJwtProvider';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  password: string;
  id: number;
}

@injectable()
export default class UpdatePasswordService {
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

  public async execute({ password, id }: IRequest): Promise<User | undefined> {
    try {
      this.log.INFO({
        message: 'Init UpdatePasswordService execute',
        params: {
          password,
        },
      });

      const user = await this.userRepository.findById(id);

      if (!user) throw new AppError('User not found');

      const hash = this.crypt.encrypt({ data: password });
      const token = this.jwt.generate({ id: user.id });

      const refreshToken = this.jwt.generateRefresh({
        id: user.id,
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
