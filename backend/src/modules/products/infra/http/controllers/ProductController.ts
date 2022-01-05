import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import FindProductByIdService from '@modules/products/services/FindProductByIdService';
import ListProductsService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
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
import Product from '../../typeorm/entities/Product';

export default class ProductController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { name, description, price, category_id, brand_id }: ICreateProduct,
  ): Promise<Product | undefined> {
    const createProduct = container.resolve(CreateProductService);

    const productCreated = await createProduct.execute({
      name,
      description,
      price,
      category_id,
      brand_id,
    });

    return productCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() name?: string): Promise<Product[] | undefined> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute({
      name,
    });

    return products;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Path() id: number): Promise<Product | undefined> {
    const findProduct = container.resolve(FindProductByIdService);

    const product = await findProduct.execute(id);

    return product;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name }: IUpdateProduct,
  ): Promise<Product | undefined> {
    const productUpdate = container.resolve(UpdateProductService);

    const productUpdated = await productUpdate.execute({
      name,
      id,
    });

    return productUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(@Path() id: number): Promise<Product | undefined> {
    const productDelete = container.resolve(DeleteProductService);

    const productDeleted = await productDelete.execute(id);

    return productDeleted;
  }
}
