import IBrandRepository from '@modules/brands/repositories/IBrandRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Brand from '../entities/Brand';

export default class BrandRepository implements IBrandRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  public async save(brand: ICreateBrand): Promise<Brand> {
    return this.ormRepository.save(brand);
  }

  public async create(brand: Brand): Promise<Brand | undefined> {
    const newBrand = this.ormRepository.create(brand);
    await this.ormRepository.save(newBrand);
    return newBrand;
  }

  public async update(id: number, partial: DeepPartial<Brand>): Promise<Brand> {
    const brand = await this.findById(id);
    if (!brand) {
      throw new Error('Brand not found');
    }

    const brandToSave = this.ormRepository.merge(brand, partial);
    return this.ormRepository.save(brandToSave);
  }

  public async findOne(brand: string): Promise<Brand | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: brand,
      },
    });
  }

  public async findById(id: number): Promise<Brand | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(data: IFindAllBrand): Promise<Brand[]> {
    const name = data.name || undefined;

    const brandQuery = this.ormRepository.createQueryBuilder('brand');

    if (name) {
      brandQuery.where('brand.name = :name', {
        name,
      });
    }

    return brandQuery.getMany();
  }

  public async delete(id: number): Promise<Brand> {
    const brand = await this.findById(id);
    if (!brand) {
      throw new Error('Brand not found');
    }

    return this.ormRepository.remove(brand);
  }
}
