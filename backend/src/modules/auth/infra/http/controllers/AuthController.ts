import ILoginRequest from '@modules/auth/dtos/ILoginRequest';
import ILoginResponse from '@modules/auth/dtos/ILoginResponse';
import LoginService from '@modules/auth/services/LoginService';
import { Body, Post, SuccessResponse } from 'tsoa';
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
}
