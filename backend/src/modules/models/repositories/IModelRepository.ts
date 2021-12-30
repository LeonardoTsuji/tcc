import { DeepPartial } from 'typeorm';
import Model from '../infra/typeorm/entities/Model';

export default interface IModelRepository {
  save(model: ICreateModel): Promise<Model>;
  create(model: Model): Promise<Model | undefined>;
  update(id: number, partial: DeepPartial<Model>): Promise<Model>;
  findById(id: number): Promise<Model | undefined>;
  findOne(model: string): Promise<Model | undefined>;
  findAll(data: IFindAllModel): Promise<Model[]>;
  delete(id: number): Promise<Model>;
}
