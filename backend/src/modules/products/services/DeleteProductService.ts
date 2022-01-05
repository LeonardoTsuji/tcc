import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<Product | undefined> {
    try {
      const productFound = await this.productRepository.findById(id);

      if (!productFound) throw new AppError('Product not found!', 404);

      const productDeleted = await this.productRepository.delete(
        productFound.id,
      );

      return productDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
