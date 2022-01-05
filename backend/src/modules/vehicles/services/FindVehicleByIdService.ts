import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehicleRepository from '../repositories/IVehicleRepository';

@injectable()
export default class FindVehicleByIdService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(data: IFindByIdVehicle): Promise<Vehicle | undefined> {
    try {
      return this.vehicleRepository.findById(data);
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
