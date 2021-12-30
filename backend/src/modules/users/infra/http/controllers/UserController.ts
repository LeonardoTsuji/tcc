import ICreateUser from '@modules/users/dtos/ICreateUser';
import IDeleteUser from '@modules/users/dtos/IDeleteUser';
import IUpdateUser from '@modules/users/dtos/IUpdateUser';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import FindUserByIdService from '@modules/users/services/FindUserByIdService';
import ListUsersService from '@modules/users/services/ListUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import {
  Body,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Security,
  SuccessResponse,
} from 'tsoa';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

export default class UserController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { email, password, name, phone, role_id }: ICreateUser,
  ): Promise<User | undefined> {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      name,
      phone,
      role_id,
      active: true,
    });

    return user;
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

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Query() email?: string): Promise<User | undefined> {
    const findUser = container.resolve(FindUserByIdService);

    const user = await findUser.execute({
      email,
    });

    return user;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name, email, role_id, phone, active }: IUpdateUser,
  ): Promise<User | undefined> {
    const userUpdate = container.resolve(UpdateUserService);

    const userUpdated = await userUpdate.execute({
      name,
      email,
      role_id,
      phone,
      active,
      id,
    });

    return userUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(
    @Path() id: number,
    @Body() { email }: IDeleteUser,
  ): Promise<User | undefined> {
    const userDelete = container.resolve(DeleteUserService);

    const userDeleted = await userDelete.execute({
      email,
    });

    return userDeleted;
  }
}
