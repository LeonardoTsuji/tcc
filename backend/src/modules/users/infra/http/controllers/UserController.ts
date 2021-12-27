import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import { Request, Response } from 'express';
import { Get, Query, Security, SuccessResponse } from 'tsoa';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, name, phone, roleId } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      name,
      phone,
      role_id: roleId,
      active: true,
    });

    return response.json(user);
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() role?: string): Promise<User[] | undefined> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute({
      role,
    });

    return users;
  }
}
