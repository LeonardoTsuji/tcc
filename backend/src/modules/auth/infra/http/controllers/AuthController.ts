import ILoginRequest from '@modules/auth/dtos/ILoginRequest';
import ILoginResponse from '@modules/auth/dtos/ILoginResponse';
import ForgotPasswordService from '@modules/auth/services/ForgotPasswordService';
import LoginService from '@modules/auth/services/LoginService';
import UpdatePasswordService from '@modules/auth/services/UpdatePasswordService';
import User from '@modules/users/infra/typeorm/entities/User';
import { Body, Inject, Post, Put, SuccessResponse } from 'tsoa';
import { container } from 'tsyringe';

export default class AuthController {
  @Post('/')
  @SuccessResponse('200', 'OK')
  public async login(
    @Body() { email, password, grant_type, refresh_token }: ILoginRequest,
  ): Promise<ILoginResponse | undefined> {
    const loginService = container.resolve(LoginService);

    const login = await loginService.execute({
      email,
      password,
      grant_type,
      refresh_token,
    });

    return login;
  }
  @Put('/update-password')
  @SuccessResponse('200', 'OK')
  public async update(
    @Body() { password }: IUpdatePasswordRequest,
    @Inject() id: number,
  ): Promise<User | undefined> {
    const updatePasswordService = container.resolve(UpdatePasswordService);

    const updated = await updatePasswordService.execute({
      password,
      id,
    });

    return updated;
  }
  @Put('/forgot-password')
  @SuccessResponse('200', 'OK')
  public async forgot(
    @Body() { email }: IForgotPasswordRequest,
  ): Promise<User | undefined> {
    const forgotPasswordService = container.resolve(ForgotPasswordService);

    const updated = await forgotPasswordService.execute({
      email,
    });

    return updated;
  }
}
