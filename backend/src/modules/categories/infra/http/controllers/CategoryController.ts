import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import FindCategoryByIdService from '@modules/categories/services/FindCategoryByIdService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
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
import Category from '../../typeorm/entities/Category';

export default class CategoryController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { name }: ICreateCategory,
  ): Promise<Category | undefined> {
    const createCategory = container.resolve(CreateCategoryService);

    const categoryCreated = await createCategory.execute({
      name,
    });

    return categoryCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() name?: string): Promise<Category[] | undefined> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute({
      name,
    });

    return categories;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Path() id: number): Promise<Category | undefined> {
    const findCategory = container.resolve(FindCategoryByIdService);

    const category = await findCategory.execute(id);

    return category;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name }: IUpdateCategory,
  ): Promise<Category | undefined> {
    const categoryUpdate = container.resolve(UpdateCategoryService);

    const categoryUpdated = await categoryUpdate.execute({
      name,
      id,
    });

    return categoryUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(@Path() id: number): Promise<Category | undefined> {
    const categoryDelete = container.resolve(DeleteCategoryService);

    const categoryDeleted = await categoryDelete.execute(id);

    return categoryDeleted;
  }
}
