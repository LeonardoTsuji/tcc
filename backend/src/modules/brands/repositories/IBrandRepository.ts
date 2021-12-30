import { DeepPartial } from 'typeorm';
import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandRepository {
  save(brand: ICreateBrand): Promise<Brand>;
  create(brand: Brand): Promise<Brand | undefined>;
  update(id: number, partial: DeepPartial<Brand>): Promise<Brand>;
  findById(id: number): Promise<Brand | undefined>;
  findOne(brand: string): Promise<Brand | undefined>;
  findAll(data: IFindAllBrand): Promise<Brand[]>;
  delete(id: number): Promise<Brand>;
}
