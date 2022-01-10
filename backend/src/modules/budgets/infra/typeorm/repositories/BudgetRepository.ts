import IBudgetRepository from '@modules/budgets/repositories/IBudgetRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Budget from '../entities/Budget';

export default class BudgetRepository implements IBudgetRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  public async save(budget: Budget): Promise<Budget> {
    return this.ormRepository.save(budget);
  }

  public async create(budget: ICreateBudget): Promise<Budget | undefined> {
    const newBudget = this.ormRepository.create(budget);
    await this.ormRepository.save(newBudget);
    return newBudget;
  }

  public async update(budget: Budget): Promise<Budget> {
    return this.ormRepository.save(budget);
  }

  public async findOne(budget: string): Promise<Budget | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: budget,
      },
    });
  }

  public async findById({
    id,
    user_id,
  }: IFindByIdBudget): Promise<Budget | undefined> {
    return this.ormRepository
      .createQueryBuilder('budget')
      .innerJoinAndSelect('budget.products', 'products')
      .innerJoinAndSelect('budget.vehicle', 'vehicle')
      .innerJoinAndSelect('vehicle.model', 'model')
      .innerJoinAndSelect('vehicle.brand', 'brand')
      .where('budget.user_id = :user_id', {
        user_id,
      })
      .where('budget.id = :id', {
        id,
      })
      .getOne();
  }

  public async findAll(data: IFindAllBudget): Promise<Budget[]> {
    const status = data.status || undefined;
    const userId = data.user_id || undefined;

    const budgetQuery = this.ormRepository
      .createQueryBuilder('budget')
      .innerJoinAndSelect('budget.products', 'products')
      .innerJoinAndSelect('budget.vehicle', 'vehicle')
      .innerJoinAndSelect('vehicle.model', 'model')
      .innerJoinAndSelect('vehicle.brand', 'brand');

    if (status) {
      budgetQuery.where('budget.status = :status', {
        status,
      });
    }

    if (userId) {
      budgetQuery.where('budget.user_id = :userId', {
        userId,
      });
    }

    return budgetQuery.getMany();
  }

  public async delete(data: IFindByIdVehicle): Promise<Budget> {
    const budget = await this.findById(data);
    if (!budget) {
      throw new Error('Budget not found');
    }

    return this.ormRepository.remove(budget);
  }
}
