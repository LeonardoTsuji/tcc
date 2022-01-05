import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
    description,
    price,
    category_id,
    brand_id,
  }: ICreateProduct): Promise<Product | undefined> {
    try {
      if (!name) {
        throw new AppError(
          'Incomplete data for creating a new product, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          name,
        },
      });
      const hasProduct = await this.productRepository.findOne(name);

      this.log.INFO({
        message: 'productRepository.findOne',
        result: {
          user: JSON.stringify(hasProduct),
        },
      });

      if (hasProduct) {
        throw new AppError('Product already exists');
      }

      const newProduct: Product = await this.productRepository.save({
        name,
        description,
        price,
        category_id,
        brand_id,
      });

      this.log.INFO({
        message: 'productRepository.save',
        result: {
          model: JSON.stringify(newProduct),
        },
      });

      return newProduct;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
