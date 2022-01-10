import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetRepository';

@injectable()
export default class ListBudgetsService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    status,
    user_id,
  }: IFindAllBudget): Promise<Budget[] | undefined> {
    try {
      return this.budgetRepository.findAll({ status, user_id });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
