import CreateMechanicalServiceService from '@modules/mechanicalServices/services/CreateMechanicalServiceService';
import DeleteMechanicalServiceService from '@modules/mechanicalServices/services/DeleteMechanicalServiceService';
import FindMechanicalServiceByIdService from '@modules/mechanicalServices/services/FindMechanicalServiceByIdService';
import ListMechanicalServicesService from '@modules/mechanicalServices/services/ListMechanicalServicesService';
import UpdateMechanicalServiceService from '@modules/mechanicalServices/services/UpdateMechanicalServiceService';
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
import MechanicalService from '../../typeorm/entities/MechanicalService';

export default class MechanicalServiceController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { name, description, price }: ICreateMechanicalService,
  ): Promise<MechanicalService | undefined> {
    const createMechanicalService = container.resolve(
      CreateMechanicalServiceService,
    );

    const mechanicalServiceCreated = await createMechanicalService.execute({
      name,
      price,
      description,
    });

    return mechanicalServiceCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(
    @Query() name?: string,
  ): Promise<MechanicalService[] | undefined> {
    const listMechanicalServices = container.resolve(
      ListMechanicalServicesService,
    );

    const mechanicalServices = await listMechanicalServices.execute({
      name,
    });

    return mechanicalServices;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(
    @Path() id: number,
  ): Promise<MechanicalService | undefined> {
    const findMechanicalService = container.resolve(
      FindMechanicalServiceByIdService,
    );

    const mechanicalService = await findMechanicalService.execute(id);

    return mechanicalService;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name, price, description }: IUpdateMechanicalService,
  ): Promise<MechanicalService | undefined> {
    const mechanicalServiceUpdate = container.resolve(
      UpdateMechanicalServiceService,
    );

    const mechanicalServiceUpdated = await mechanicalServiceUpdate.execute({
      name,
      id,
      price,
      description,
    });

    return mechanicalServiceUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(
    @Path() id: number,
  ): Promise<MechanicalService | undefined> {
    const mechanicalServiceDelete = container.resolve(
      DeleteMechanicalServiceService,
    );

    const mechanicalServiceDeleted = await mechanicalServiceDelete.execute(id);

    return mechanicalServiceDeleted;
  }
}
