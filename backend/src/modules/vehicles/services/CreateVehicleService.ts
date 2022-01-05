import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehicleRepository from '../repositories/IVehicleRepository';

@injectable()
export default class CreateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    plate,
    color,
    year,
    kilometer,
    brand_id,
    model_id,
    user_id,
  }: ICreateVehicle): Promise<Vehicle | undefined> {
    try {
      if (
        !plate ||
        !color ||
        !year ||
        !kilometer ||
        !brand_id ||
        !model_id ||
        !user_id
      ) {
        throw new AppError(
          'Incomplete data for creating a new vehicle, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          plate,
          color,
          year,
          kilometer,
          brand_id,
          model_id,
        },
      });

      const newVehicle: Vehicle = await this.vehicleRepository.save({
        plate,
        color,
        year,
        kilometer,
        brand_id,
        model_id,
        user_id,
      });

      this.log.INFO({
        message: 'vehicleRepository.save',
        result: {
          model: JSON.stringify(newVehicle),
        },
      });

      return newVehicle;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
