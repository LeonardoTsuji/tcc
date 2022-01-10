import IProductRepository from '@modules/products/repositories/IProductRepository';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetRepository';

@injectable()
export default class UpdateBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(data: IUpdateBudget): Promise<Budget | undefined> {
    try {
      const budgetFound = await this.budgetRepository.findById(data);

      if (!budgetFound) throw new AppError('Budget not found!', 404);

      const productsPromises = data.products.map(async product => {
        const prod = await this.productRepository.findById(product.product_id);

        if (!prod) throw new AppError('Product does not exists!');

        return prod;
      });

      budgetFound.products = await Promise.all(productsPromises);
      budgetFound.expiration_date = data.expiration_date;
      budgetFound.payment_method = data.payment_method;
      budgetFound.schedule_id = data.schedule_id;
      budgetFound.status = data.status;
      budgetFound.vehicle_id = data.vehicle_id;
      budgetFound.updated_at = new Date();

      const budgetUpdated = await this.budgetRepository.update(budgetFound);

      return budgetUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
