import IBudgetRepository from '@modules/budgets/repositories/IBudgetRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Budget from '../entities/Budget';

export default class BudgetRepository implements IBudgetRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  public async save(budget: ICreateBudget): Promise<Budget> {
    return this.ormRepository.save(budget);
  }

  public async create(budget: Budget): Promise<Budget | undefined> {
    const newBudget = this.ormRepository.create(budget);
    await this.ormRepository.save(newBudget);
    return newBudget;
  }

  public async update(
    id: number,
    partial: DeepPartial<Budget>,
  ): Promise<Budget> {
    const budget = await this.findById(id);
    if (!budget) {
      throw new Error('Budget not found');
    }

    const budgetToSave = this.ormRepository.merge(budget, partial);
    return this.ormRepository.save(budgetToSave);
  }

  public async findOne(budget: string): Promise<Budget | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: budget,
      },
    });
  }

  public async findById(id: number): Promise<Budget | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(data: IFindAllBudget): Promise<Budget[]> {
    const name = data.name || undefined;

    const budgetQuery = this.ormRepository.createQueryBuilder('budget');

    if (name) {
      budgetQuery.where('budget.name = :name', {
        name,
      });
    }

    return budgetQuery.getMany();
  }

  public async delete(id: number): Promise<Budget> {
    const budget = await this.findById(id);
    if (!budget) {
      throw new Error('Budget not found');
    }

    return this.ormRepository.remove(budget);
  }
}
