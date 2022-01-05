import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
  }: ICreateCategory): Promise<Category | undefined> {
    try {
      if (!name) {
        throw new AppError(
          'Incomplete data for creating a new category, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          name,
        },
      });
      const hasCategory = await this.categoryRepository.findOne(name);

      this.log.INFO({
        message: 'categoryRepository.findOne',
        result: {
          user: JSON.stringify(hasCategory),
        },
      });

      if (hasCategory) {
        throw new AppError('Category already exists');
      }

      const newCategory: Category = await this.categoryRepository.save({
        name,
      });

      this.log.INFO({
        message: 'categoryRepository.save',
        result: {
          model: JSON.stringify(newCategory),
        },
      });

      return newCategory;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
