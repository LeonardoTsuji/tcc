import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import DeleteBudgetService from '@modules/budgets/services/DeleteBudgetService';
import FindBudgetByIdService from '@modules/budgets/services/FindBudgetByIdService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetsService';
import UpdateBudgetService from '@modules/budgets/services/UpdateBudgetService';
import {
  Body,
  Delete,
  Get,
  Inject,
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
    @Body()
    {
      expiration_date,
      payment_method,
      status,
      products,
      vehicle_id,
      schedule_id,
    }: ICreateBudgetProducts,
    @Inject() userId: number,
  ): Promise<Budget | undefined> {
    const createBudget = container.resolve(CreateBudgetService);

    const budgetCreated = await createBudget.execute({
      expiration_date,
      payment_method,
      status,
      products,
      vehicle_id,
      schedule_id,
      user_id: userId,
    });

    return budgetCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(
    @Query() status?: string,
    @Query() userId?: number,
  ): Promise<Budget[] | undefined> {
    const listBudgets = container.resolve(ListBudgetsService);

    const budgets = await listBudgets.execute({
      status,
      user_id: userId,
    });

    return budgets;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(
    @Path() id: number,
    @Query() user_id: number,
  ): Promise<Budget | undefined> {
    const findBudget = container.resolve(FindBudgetByIdService);

    const budget = await findBudget.execute({ id, user_id });

    return budget;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() data: IUpdateBudget,
  ): Promise<Budget | undefined> {
    const budgetUpdate = container.resolve(UpdateBudgetService);

    const budgetUpdated = await budgetUpdate.execute({ ...data, id });

    return budgetUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(
    @Path() id: number,
    @Inject() user_id: number,
  ): Promise<Budget | undefined> {
    const budgetDelete = container.resolve(DeleteBudgetService);

    const budgetDeleted = await budgetDelete.execute({ id, user_id });

    return budgetDeleted;
  }
}
