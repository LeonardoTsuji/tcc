import { DeepPartial } from 'typeorm';
import Budget from '../infra/typeorm/entities/Budget';

export default interface IBudgetRepository {
  save(budget: ICreateBudget): Promise<Budget>;
  create(budget: Budget): Promise<Budget | undefined>;
  update(id: number, partial: DeepPartial<Budget>): Promise<Budget>;
  findById(id: number): Promise<Budget | undefined>;
  findOne(budget: string): Promise<Budget | undefined>;
  findAll(data: IFindAllBudget): Promise<Budget[]>;
  delete(id: number): Promise<Budget>;
}
