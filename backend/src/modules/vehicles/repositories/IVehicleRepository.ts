import Vehicle from '../infra/typeorm/entities/Vehicle';

export default interface IVehicleRepository {
  save(vehicle: ICreateVehicle): Promise<Vehicle>;
  create(vehicle: Vehicle): Promise<Vehicle | undefined>;
  update(data: IUpdateVehicle): Promise<Vehicle>;
  findById(data: IFindByIdVehicle): Promise<Vehicle | undefined>;
  findAll(data: IFindAllVehicle): Promise<Vehicle[]>;
  delete(data: IFindByIdVehicle): Promise<Vehicle>;
}
