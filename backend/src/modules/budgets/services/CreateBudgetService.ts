import IProductRepository from '@modules/products/repositories/IProductRepository';
import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetRepository';

@injectable()
export default class CreateBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    expiration_date,
    payment_method,
    status,
    vehicle_id,
    schedule_id,
    user_id,
    products,
  }: ICreateBudgetProducts): Promise<Budget | undefined> {
    try {
      if (
        !expiration_date ||
        !payment_method ||
        !status ||
        !vehicle_id ||
        !schedule_id ||
        !products
      ) {
        throw new AppError(
          'Incomplete data for creating a new budget, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          expiration_date,
          payment_method,
          status,
          vehicle_id,
          schedule_id,
          user_id,
          products,
        },
      });

      const newBudget = await this.budgetRepository.create({
        expiration_date,
        payment_method,
        status,
        vehicle_id,
        schedule_id,
        user_id,
      });

      this.log.INFO({
        message: 'budgetRepository.create',
        result: {
          model: JSON.stringify(newBudget),
        },
      });

      if (!newBudget) {
        throw new AppError('Error on create budget!');
      }

      const productsPromises = products.map(async product => {
        const prod = await this.productRepository.findById(product.product_id);

        if (!prod) throw new AppError('Product does not exists!');

        return prod;
      });

      newBudget.products = await Promise.all(productsPromises);

      await this.budgetRepository.save(newBudget);

      return newBudget;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
