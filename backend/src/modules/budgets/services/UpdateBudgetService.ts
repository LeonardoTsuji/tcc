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
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
    id,
  }: IUpdateBudget): Promise<Budget | undefined> {
    try {
      const budgetFound = await this.budgetRepository.findById(id);

      if (!budgetFound) throw new AppError('Budget not found!', 404);

      const budgetUpdated = await this.budgetRepository.update(budgetFound.id, {
        name,
      });

      return budgetUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
