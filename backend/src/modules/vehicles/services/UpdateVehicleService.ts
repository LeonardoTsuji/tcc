import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehicleRepository from '../repositories/IVehicleRepository';

@injectable()
export default class UpdateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    id,
    user_id,
    plate,
    color,
    year,
    kilometer,
    brand_id,
    model_id,
  }: IUpdateVehicle): Promise<Vehicle | undefined> {
    try {
      const vehicleFound = await this.vehicleRepository.findById({
        id,
        user_id,
      });

      if (!vehicleFound) throw new AppError('Vehicle not found!', 404);

      const vehicleUpdated = await this.vehicleRepository.update({
        id: vehicleFound.id,
        user_id,
        plate,
        color,
        year,
        kilometer,
        brand_id,
        model_id,
      });

      return vehicleUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
