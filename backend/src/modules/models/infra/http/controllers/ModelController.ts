import CreateModelService from '@modules/models/services/CreateModelService';
import DeleteModelService from '@modules/models/services/DeleteModelService';
import FindModelByIdService from '@modules/models/services/FindModelByIdService';
import ListModelsService from '@modules/models/services/ListModelsService';
import UpdateModelService from '@modules/models/services/UpdateModelService';
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
import Model from '../../typeorm/entities/Model';

export default class ModelController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { brand_id, model }: ICreateModel,
  ): Promise<Model | undefined> {
    const createModel = container.resolve(CreateModelService);

    const modelCreated = await createModel.execute({
      brand_id,
      model,
    });

    return modelCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() brand_id?: number): Promise<Model[] | undefined> {
    const listModels = container.resolve(ListModelsService);

    const models = await listModels.execute({
      brand_id,
    });

    return models;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Path() id: number): Promise<Model | undefined> {
    const findModel = container.resolve(FindModelByIdService);

    const model = await findModel.execute(id);

    return model;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { model, brand_id }: IUpdateModel,
  ): Promise<Model | undefined> {
    const modelUpdate = container.resolve(UpdateModelService);

    const modelUpdated = await modelUpdate.execute({
      model,
      brand_id,
      id,
    });

    return modelUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(@Path() id: number): Promise<Model | undefined> {
    const modelDelete = container.resolve(DeleteModelService);

    const modelDeleted = await modelDelete.execute(id);

    return modelDeleted;
  }
}
