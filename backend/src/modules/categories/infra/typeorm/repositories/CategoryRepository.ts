import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Category from '../entities/Category';

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async save(category: ICreateCategory): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async create(category: Category): Promise<Category | undefined> {
    const newCategory = this.ormRepository.create(category);
    await this.ormRepository.save(newCategory);
    return newCategory;
  }

  public async update(
    id: number,
    partial: DeepPartial<Category>,
  ): Promise<Category> {
    const category = await this.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    const categoryToSave = this.ormRepository.merge(category, partial);
    return this.ormRepository.save(categoryToSave);
  }

  public async findOne(category: string): Promise<Category | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: category,
      },
    });
  }

  public async findById(id: number): Promise<Category | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(data: IFindAllCategory): Promise<Category[]> {
    const name = data.name || undefined;

    const categoryQuery = this.ormRepository.createQueryBuilder('category');

    if (name) {
      categoryQuery.where('category.name = :name', {
        name,
      });
    }

    return categoryQuery.getMany();
  }

  public async delete(id: number): Promise<Category> {
    const category = await this.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    return this.ormRepository.remove(category);
  }
}
