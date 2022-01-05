import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MechanicalService from '../infra/typeorm/entities/MechanicalService';
import IMechanicalServiceRepository from '../repositories/IMechanicalServiceRepository';

@injectable()
export default class CreateMechanicalServiceService {
  constructor(
    @inject('MechanicalServiceRepository')
    private mechanicalServiceRepository: IMechanicalServiceRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
    description,
    price,
  }: ICreateMechanicalService): Promise<MechanicalService | undefined> {
    try {
      if (!name || !description || !price) {
        throw new AppError(
          'Incomplete data for creating a new mechanicalService, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          name,
        },
      });
      const hasMechanicalService =
        await this.mechanicalServiceRepository.findOne(name);

      this.log.INFO({
        message: 'mechanicalServiceRepository.findOne',
        result: {
          user: JSON.stringify(hasMechanicalService),
        },
      });

      if (hasMechanicalService) {
        throw new AppError('MechanicalService already exists');
      }

      const newMechanicalService: MechanicalService =
        await this.mechanicalServiceRepository.save({
          name,
          description,
          price,
        });

      this.log.INFO({
        message: 'mechanicalServiceRepository.save',
        result: {
          model: JSON.stringify(newMechanicalService),
        },
      });

      return newMechanicalService;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
