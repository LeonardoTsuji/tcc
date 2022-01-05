import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MechanicalService from '../infra/typeorm/entities/MechanicalService';
import IMechanicalServiceRepository from '../repositories/IMechanicalServiceRepository';

@injectable()
export default class FindMechanicalServiceByIdService {
  constructor(
    @inject('MechanicalServiceRepository')
    private mechanicalServiceRepository: IMechanicalServiceRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<MechanicalService | undefined> {
    try {
      return this.mechanicalServiceRepository.findById(id);
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
