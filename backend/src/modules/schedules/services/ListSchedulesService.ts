import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Schedule from '../infra/typeorm/entities/Schedule';
import IScheduleRepository from '../repositories/IScheduleRepository';

@injectable()
export default class ListSchedulesService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    name,
  }: IFindAllSchedule): Promise<Schedule[] | undefined> {
    try {
      return this.scheduleRepository.findAll({ name });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
