import { DeepPartial } from 'typeorm';
import Schedule from '../infra/typeorm/entities/Schedule';

export default interface IScheduleRepository {
  save(schedule: ICreateSchedule): Promise<Schedule>;
  create(schedule: Schedule): Promise<Schedule | undefined>;
  update(id: number, partial: DeepPartial<Schedule>): Promise<Schedule>;
  findById(id: number): Promise<Schedule | undefined>;
  findOne(schedule: string): Promise<Schedule | undefined>;
  findAll(data: IFindAllSchedule): Promise<Schedule[]>;
  delete(id: number): Promise<Schedule>;
}
