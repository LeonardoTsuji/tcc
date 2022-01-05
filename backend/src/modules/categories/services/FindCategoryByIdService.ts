import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class FindCategoryByIdService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<Category | undefined> {
    try {
      return this.categoryRepository.findById(id);
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
