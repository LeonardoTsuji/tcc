import IModelRepository from '@modules/models/repositories/IModelRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Model from '../entities/Model';

export default class ModelRepository implements IModelRepository {
  private ormRepository: Repository<Model>;

  constructor() {
    this.ormRepository = getRepository(Model);
  }

  public async save(model: ICreateModel): Promise<Model> {
    return this.ormRepository.save(model);
  }

  public async create(model: Model): Promise<Model | undefined> {
    const newModel = this.ormRepository.create(model);
    await this.ormRepository.save(newModel);
    return newModel;
  }

  public async update(id: number, partial: DeepPartial<Model>): Promise<Model> {
    const model = await this.findById(id);
    if (!model) {
      throw new Error('Model not found');
    }

    const modelToSave = this.ormRepository.merge(model, partial);
    return this.ormRepository.save(modelToSave);
  }

  public async findOne(model: string): Promise<Model | undefined> {
    return this.ormRepository.findOne({
      where: {
        model,
      },
    });
  }

  public async findById(id: number): Promise<Model | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(data: IFindAllModel): Promise<Model[]> {
    const brand_id = data.brand_id || undefined;

    const modelQuery = this.ormRepository
      .createQueryBuilder('model')
      .innerJoin('model.brand', 'brand');

    if (brand_id) {
      modelQuery.andWhere('brand.id = :brand_id', {
        brand_id,
      });
    }

    return modelQuery.getMany();
  }

  public async delete(id: number): Promise<Model> {
    const model = await this.findById(id);
    if (!model) {
      throw new Error('Model not found');
    }

    return this.ormRepository.remove(model);
  }
}
