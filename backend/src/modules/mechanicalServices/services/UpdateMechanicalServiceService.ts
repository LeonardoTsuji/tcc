import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MechanicalService from '../infra/typeorm/entities/MechanicalService';
import IMechanicalServiceRepository from '../repositories/IMechanicalServiceRepository';

@injectable()
export default class UpdateMechanicalServiceService {
  constructor(
    @inject('MechanicalServiceRepository')
    private mechanicalServiceRepository: IMechanicalServiceRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
    id,
    price,
    description,
  }: IUpdateMechanicalService): Promise<MechanicalService | undefined> {
    try {
      if (!name || !description || !price) {
        throw new AppError(
          'Incomplete data for update a mechanicalService, please validate and try again.',
        );
      }

      const mechanicalServiceFound =
        await this.mechanicalServiceRepository.findById(id);

      if (!mechanicalServiceFound)
        throw new AppError('MechanicalService not found!', 404);

      const mechanicalServiceUpdated =
        await this.mechanicalServiceRepository.update(
          mechanicalServiceFound.id,
          {
            name,
            price,
            description,
          },
        );

      return mechanicalServiceUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
