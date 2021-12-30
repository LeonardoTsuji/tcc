import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';

@injectable()
export default class UpdateModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    brand_id,
    model,
    id,
  }: IUpdateModel): Promise<Model | undefined> {
    try {
      const modelFound = await this.modelRepository.findById(id);

      if (!modelFound) throw new AppError('Model not found!', 404);

      const modelUpdated = await this.modelRepository.update(modelFound.id, {
        brand_id,
        model,
      });

      return modelUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
