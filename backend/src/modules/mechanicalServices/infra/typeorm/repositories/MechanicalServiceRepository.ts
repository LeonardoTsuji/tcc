import IMechanicalServiceRepository from '@modules/mechanicalServices/repositories/IMechanicalServiceRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import MechanicalService from '../entities/MechanicalService';

export default class MechanicalServiceRepository
  implements IMechanicalServiceRepository
{
  private ormRepository: Repository<MechanicalService>;

  constructor() {
    this.ormRepository = getRepository(MechanicalService);
  }

  public async save(
    mechanicalService: ICreateMechanicalService,
  ): Promise<MechanicalService> {
    return this.ormRepository.save(mechanicalService);
  }

  public async create(
    mechanicalService: MechanicalService,
  ): Promise<MechanicalService | undefined> {
    const newMechanicalService = this.ormRepository.create(mechanicalService);
    await this.ormRepository.save(newMechanicalService);
    return newMechanicalService;
  }

  public async update(
    id: number,
    partial: DeepPartial<MechanicalService>,
  ): Promise<MechanicalService> {
    const mechanicalService = await this.findById(id);
    if (!mechanicalService) {
      throw new Error('MechanicalService not found');
    }

    const mechanicalServiceToSave = this.ormRepository.merge(
      mechanicalService,
      partial,
    );
    return this.ormRepository.save(mechanicalServiceToSave);
  }

  public async findOne(
    mechanicalService: string,
  ): Promise<MechanicalService | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: mechanicalService,
      },
    });
  }

  public async findById(id: number): Promise<MechanicalService | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(
    data: IFindAllMechanicalService,
  ): Promise<MechanicalService[]> {
    const name = data.name || undefined;

    const mechanicalServiceQuery =
      this.ormRepository.createQueryBuilder('mechanicalService');

    if (name) {
      mechanicalServiceQuery.where('mechanicalService.name = :name', {
        name,
      });
    }

    return mechanicalServiceQuery.getMany();
  }

  public async delete(id: number): Promise<MechanicalService> {
    const mechanicalService = await this.findById(id);
    if (!mechanicalService) {
      throw new Error('MechanicalService not found');
    }

    return this.ormRepository.remove(mechanicalService);
  }
}
