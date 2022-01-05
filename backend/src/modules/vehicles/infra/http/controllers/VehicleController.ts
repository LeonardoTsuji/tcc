import CreateVehicleService from '@modules/vehicles/services/CreateVehicleService';
import DeleteVehicleService from '@modules/vehicles/services/DeleteVehicleService';
import FindVehicleByIdService from '@modules/vehicles/services/FindVehicleByIdService';
import ListVehiclesService from '@modules/vehicles/services/ListVehiclesService';
import UpdateVehicleService from '@modules/vehicles/services/UpdateVehicleService';
import {
  Body,
  Delete,
  Get,
  Inject,
  Path,
  Post,
  Put,
  Query,
  Security,
  SuccessResponse,
} from 'tsoa';
import { container } from 'tsyringe';
import Vehicle from '../../typeorm/entities/Vehicle';

export default class VehicleController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body()
    {
      plate,
      color,
      year,
      kilometer,
      brand_id,
      model_id,
      user_id,
    }: ICreateVehicle,
    @Inject() userId: number,
  ): Promise<Vehicle | undefined> {
    const createVehicle = container.resolve(CreateVehicleService);

    const vehicleCreated = await createVehicle.execute({
      plate,
      color,
      year,
      kilometer,
      brand_id,
      model_id,
      user_id: userId ?? user_id,
    });

    return vehicleCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(
    @Inject() userId: number,
    @Query() name?: string,
  ): Promise<Vehicle[] | undefined> {
    const listVehicles = container.resolve(ListVehiclesService);

    const vehicles = await listVehicles.execute({
      name,
      user_id: userId,
    });

    return vehicles;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(
    @Path() id: number,
    @Inject() userId: number,
  ): Promise<Vehicle | undefined> {
    const findVehicle = container.resolve(FindVehicleByIdService);

    const vehicle = await findVehicle.execute({ id, user_id: userId });

    return vehicle;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body()
    {
      plate,
      color,
      year,
      kilometer,
      brand_id,
      model_id,
      user_id,
    }: IUpdateVehicle,
    @Inject() userId: number,
  ): Promise<Vehicle | undefined> {
    const vehicleUpdate = container.resolve(UpdateVehicleService);

    const vehicleUpdated = await vehicleUpdate.execute({
      id,
      user_id: userId,
      plate,
      color,
      year,
      kilometer,
      brand_id,
      model_id,
    });

    return vehicleUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(
    @Path() id: number,
    @Body() body: any,
    @Inject() userId: number,
  ): Promise<Vehicle | undefined> {
    const vehicleDelete = container.resolve(DeleteVehicleService);

    const vehicleDeleted = await vehicleDelete.execute({ id, user_id: userId });

    return vehicleDeleted;
  }
}
