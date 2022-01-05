import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import DeleteBudgetService from '@modules/budgets/services/DeleteBudgetService';
import FindBudgetByIdService from '@modules/budgets/services/FindBudgetByIdService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetsService';
import UpdateBudgetService from '@modules/budgets/services/UpdateBudgetService';
import {
  Body,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Security,
  SuccessResponse,
} from 'tsoa';
import { container } from 'tsyringe';
import Budget from '../../typeorm/entities/Budget';

export default class BudgetController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { name }: ICreateBudget,
  ): Promise<Budget | undefined> {
    const createBudget = container.resolve(CreateBudgetService);

    const budgetCreated = await createBudget.execute({
      name,
    });

    return budgetCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() name?: string): Promise<Budget[] | undefined> {
    const listBudgets = container.resolve(ListBudgetsService);

    const budgets = await listBudgets.execute({
      name,
    });

    return budgets;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Path() id: number): Promise<Budget | undefined> {
    const findBudget = container.resolve(FindBudgetByIdService);

    const budget = await findBudget.execute(id);

    return budget;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name }: IUpdateBudget,
  ): Promise<Budget | undefined> {
    const budgetUpdate = container.resolve(UpdateBudgetService);

    const budgetUpdated = await budgetUpdate.execute({
      name,
      id,
    });

    return budgetUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(@Path() id: number): Promise<Budget | undefined> {
    const budgetDelete = container.resolve(DeleteBudgetService);

    const budgetDeleted = await budgetDelete.execute(id);

    return budgetDeleted;
  }
}
