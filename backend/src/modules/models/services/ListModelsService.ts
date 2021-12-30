import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';

interface IRequest {
  brand_id?: number;
}

@injectable()
export default class ListModelsService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ brand_id }: IRequest): Promise<Model[] | undefined> {
    try {
      return this.modelRepository.findAll({ brand_id });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
