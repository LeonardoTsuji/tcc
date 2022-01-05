import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehicleRepository from '../repositories/IVehicleRepository';

@injectable()
export default class ListVehiclesService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
    user_id,
  }: IFindAllVehicle): Promise<Vehicle[] | undefined> {
    try {
      return this.vehicleRepository.findAll({ name, user_id });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
