import { DeepPartial } from 'typeorm';
import Budget from '../infra/typeorm/entities/Budget';

export default interface IBudgetRepository {
  save(budget: Budget): Promise<Budget>;
  create(budget: ICreateBudget): Promise<Budget | undefined>;
  update(budget: Budget): Promise<Budget>;
  findById(id: IFindByIdBudget): Promise<Budget | undefined>;
  findOne(budget: string): Promise<Budget | undefined>;
  findAll(data: IFindAllBudget): Promise<Budget[]>;
  delete(data: IFindByIdVehicle): Promise<Budget>;
}
