import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Schedule from '../entities/Schedule';

export default class ScheduleRepository implements IScheduleRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async save(schedule: ICreateSchedule): Promise<Schedule> {
    return this.ormRepository.save(schedule);
  }

  public async create(schedule: Schedule): Promise<Schedule | undefined> {
    const newSchedule = this.ormRepository.create(schedule);
    await this.ormRepository.save(newSchedule);
    return newSchedule;
  }

  public async update(
    id: number,
    partial: DeepPartial<Schedule>,
  ): Promise<Schedule> {
    const schedule = await this.findById(id);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    const scheduleToSave = this.ormRepository.merge(schedule, partial);
    return this.ormRepository.save(scheduleToSave);
  }

  public async findOne(schedule: string): Promise<Schedule | undefined> {
    return this.ormRepository.findOne({
      where: {
        name: schedule,
      },
    });
  }

  public async findById(id: number): Promise<Schedule | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(data: IFindAllSchedule): Promise<Schedule[]> {
    const status = data.status || undefined;

    const scheduleQuery = this.ormRepository.createQueryBuilder('schedule');

    if (status) {
      scheduleQuery.where('schedule.status = :status', {
        status,
      });
    }

    return scheduleQuery.getMany();
  }

  public async delete(id: number): Promise<Schedule> {
    const schedule = await this.findById(id);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    return this.ormRepository.remove(schedule);
  }
}
