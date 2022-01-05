import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehicleRepository from '../repositories/IVehicleRepository';

interface IRequest {
  id: number;
  user_id: number;
}

@injectable()
export default class DeleteVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    id,
    user_id,
  }: IRequest): Promise<Vehicle | undefined> {
    try {
      const vehicleFound = await this.vehicleRepository.findById({
        id,
        user_id,
      });

      if (!vehicleFound) throw new AppError('Vehicle not found!', 404);

      const vehicleDeleted = await this.vehicleRepository.delete({
        id: vehicleFound.id,
        user_id,
      });

      return vehicleDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
