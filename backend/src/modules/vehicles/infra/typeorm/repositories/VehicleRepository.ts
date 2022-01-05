import IVehicleRepository from '@modules/vehicles/repositories/IVehicleRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Vehicle from '../entities/Vehicle';

export default class VehicleRepository implements IVehicleRepository {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async save(vehicle: ICreateVehicle): Promise<Vehicle> {
    return this.ormRepository.save(vehicle);
  }

  public async create(vehicle: Vehicle): Promise<Vehicle | undefined> {
    const newVehicle = this.ormRepository.create(vehicle);
    await this.ormRepository.save(newVehicle);
    return newVehicle;
  }

  public async update(data: IUpdateVehicle): Promise<Vehicle> {
    const vehicle = await this.findById(data);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    const vehicleToSave = this.ormRepository.merge(vehicle, data);
    return this.ormRepository.save(vehicleToSave);
  }

  public async findById(data: IFindByIdVehicle): Promise<Vehicle | undefined> {
    return this.ormRepository.findOne({
      relations: ['user'],
      where: {
        id: data.id,
        user_id: data.user_id,
      },
    });
  }

  public async findAll(data: IFindAllVehicle): Promise<Vehicle[]> {
    const vehicleQuery = this.ormRepository
      .createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.brand', 'brand')
      .innerJoinAndSelect('vehicle.model', 'model')
      .innerJoinAndSelect('vehicle.user', 'user')
      .where('user.id = :id', {
        id: data.user_id,
      })
      .getMany();

    return vehicleQuery;
  }

  public async delete(data: IFindByIdVehicle): Promise<Vehicle> {
    const vehicle = await this.findById(data);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return this.ormRepository.remove(vehicle);
  }
}
