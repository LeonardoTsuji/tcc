import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MechanicalService from '../infra/typeorm/entities/MechanicalService';
import IMechanicalServiceRepository from '../repositories/IMechanicalServiceRepository';

@injectable()
export default class DeleteMechanicalServiceService {
  constructor(
    @inject('MechanicalServiceRepository')
    private mechanicalServiceRepository: IMechanicalServiceRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<MechanicalService | undefined> {
    try {
      const mechanicalServiceFound =
        await this.mechanicalServiceRepository.findById(id);

      if (!mechanicalServiceFound)
        throw new AppError('MechanicalService not found!', 404);

      const mechanicalServiceDeleted =
        await this.mechanicalServiceRepository.delete(
          mechanicalServiceFound.id,
        );

      return mechanicalServiceDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
