import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetRepository';

@injectable()
export default class DeleteBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<Budget | undefined> {
    try {
      const budgetFound = await this.budgetRepository.findById(id);

      if (!budgetFound) throw new AppError('Budget not found!', 404);

      const budgetDeleted = await this.budgetRepository.delete(budgetFound.id);

      return budgetDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
