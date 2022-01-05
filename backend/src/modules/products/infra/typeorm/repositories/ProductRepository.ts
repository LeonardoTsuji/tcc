import IProductRepository from '@modules/products/repositories/IProductRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Product from '../entities/Product';

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async save(product: ICreateProduct): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async create(product: Product): Promise<Product | undefined> {
    const newProduct = this.ormRepository.create(product);
    await this.ormRepository.save(newProduct);
    return newProduct;
  }

  public async update(
    id: number,
    partial: DeepPartial<Product>,
  ): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const productToSave = this.ormRepository.merge(product, partial);
    return this.ormRepository.save(productToSave);
  }

  public async findOne(product: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: product,
      },
    });
  }

  public async findById(id: number): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(data: IFindAllProduct): Promise<Product[]> {
    const name = data.name || undefined;

    const productQuery = this.ormRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.category', 'category');

    if (name) {
      productQuery.where('product.name = :name', {
        name,
      });
    }

    return productQuery.getMany();
  }

  public async delete(id: number): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    return this.ormRepository.remove(product);
  }
}
