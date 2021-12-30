import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';

@injectable()
export default class CreateModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    brand_id,
    model,
  }: ICreateModel): Promise<Model | undefined> {
    try {
      if (!brand_id || !model) {
        throw new AppError(
          'Incomplete data for creating a new model, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          brand_id,
          model,
        },
      });
      const hasModel = await this.modelRepository.findOne(model);

      this.log.INFO({
        message: 'modelRepository.findOne',
        result: {
          user: JSON.stringify(hasModel),
        },
      });

      if (hasModel) {
        throw new AppError('Model already exists');
      }

      const newModel: Model = await this.modelRepository.save({
        model,
        brand_id: brand_id,
      });

      this.log.INFO({
        message: 'modelRepository.save',
        result: {
          model: JSON.stringify(newModel),
        },
      });

      return newModel;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
