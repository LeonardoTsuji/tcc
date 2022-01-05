import { DeepPartial } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  save(product: ICreateProduct): Promise<Product>;
  create(product: Product): Promise<Product | undefined>;
  update(id: number, partial: DeepPartial<Product>): Promise<Product>;
  findById(id: number): Promise<Product | undefined>;
  findOne(product: string): Promise<Product | undefined>;
  findAll(data: IFindAllProduct): Promise<Product[]>;
  delete(id: number): Promise<Product>;
}
