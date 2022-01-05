import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<Category | undefined> {
    try {
      const categoryFound = await this.categoryRepository.findById(id);

      if (!categoryFound) throw new AppError('Category not found!', 404);

      const categoryDeleted = await this.categoryRepository.delete(
        categoryFound.id,
      );

      return categoryDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
