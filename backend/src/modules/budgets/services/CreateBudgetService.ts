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
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ name }: ICreateBudget): Promise<Budget | undefined> {
    try {
      if (!name) {
        throw new AppError(
          'Incomplete data for creating a new budget, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          name,
        },
      });
      const hasBudget = await this.budgetRepository.findOne(name);

      this.log.INFO({
        message: 'budgetRepository.findOne',
        result: {
          user: JSON.stringify(hasBudget),
        },
      });

      if (hasBudget) {
        throw new AppError('Budget already exists');
      }

      const newBudget: Budget = await this.budgetRepository.save({
        name,
      });

      this.log.INFO({
        message: 'budgetRepository.save',
        result: {
          model: JSON.stringify(newBudget),
        },
      });

      return newBudget;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
