import { DeepPartial } from 'typeorm';
import MechanicalService from '../infra/typeorm/entities/MechanicalService';

export default interface IMechanicalServiceRepository {
  save(mechanicalService: ICreateMechanicalService): Promise<MechanicalService>;
  create(
    mechanicalService: MechanicalService,
  ): Promise<MechanicalService | undefined>;
  update(
    id: number,
    partial: DeepPartial<MechanicalService>,
  ): Promise<MechanicalService>;
  findById(id: number): Promise<MechanicalService | undefined>;
  findOne(mechanicalService: string): Promise<MechanicalService | undefined>;
  findAll(data: IFindAllMechanicalService): Promise<MechanicalService[]>;
  delete(id: number): Promise<MechanicalService>;
}
