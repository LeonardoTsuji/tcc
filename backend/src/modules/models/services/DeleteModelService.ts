import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';

@injectable()
export default class DeleteModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<Model | undefined> {
    try {
      const modelFound = await this.modelRepository.findById(id);

      if (!modelFound) throw new AppError('Model not found!', 404);

      const modelDeleted = await this.modelRepository.delete(modelFound.id);

      return modelDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
