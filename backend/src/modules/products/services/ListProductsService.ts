import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
  }: IFindAllProduct): Promise<Product[] | undefined> {
    try {
      return this.productRepository.findAll({ name });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
