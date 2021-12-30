import CreateBrandService from '@modules/brands/services/CreateBrandService';
import DeleteBrandService from '@modules/brands/services/DeleteBrandService';
import FindBrandByIdService from '@modules/brands/services/FindBrandByIdService';
import ListBrandsService from '@modules/brands/services/ListBrandsService';
import UpdateBrandService from '@modules/brands/services/UpdateBrandService';
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
import Brand from '../../typeorm/entities/Brand';

export default class BrandController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { name }: ICreateBrand,
  ): Promise<Brand | undefined> {
    const createBrand = container.resolve(CreateBrandService);

    const brandCreated = await createBrand.execute({
      name,
    });

    return brandCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() name?: string): Promise<Brand[] | undefined> {
    const listBrands = container.resolve(ListBrandsService);

    const brands = await listBrands.execute({
      name,
    });

    return brands;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Path() id: number): Promise<Brand | undefined> {
    const findBrand = container.resolve(FindBrandByIdService);

    const brand = await findBrand.execute(id);

    return brand;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name }: IUpdateBrand,
  ): Promise<Brand | undefined> {
    const brandUpdate = container.resolve(UpdateBrandService);

    const brandUpdated = await brandUpdate.execute({
      name,
      id,
    });

    return brandUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(@Path() id: number): Promise<Brand | undefined> {
    const brandDelete = container.resolve(DeleteBrandService);

    const brandDeleted = await brandDelete.execute(id);

    return brandDeleted;
  }
}
