import { DeepPartial } from 'typeorm';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  save(category: ICreateCategory): Promise<Category>;
  create(category: Category): Promise<Category | undefined>;
  update(id: number, partial: DeepPartial<Category>): Promise<Category>;
  findById(id: number): Promise<Category | undefined>;
  findOne(category: string): Promise<Category | undefined>;
  findAll(data: IFindAllCategory): Promise<Category[]>;
  delete(id: number): Promise<Category>;
}
