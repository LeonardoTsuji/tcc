import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Schedule from '../infra/typeorm/entities/Schedule';
import IScheduleRepository from '../repositories/IScheduleRepository';

@injectable()
export default class UpdateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    status,
    id,
  }: IUpdateSchedule): Promise<Schedule | undefined> {
    try {
      const scheduleFound = await this.scheduleRepository.findById(id);

      if (!scheduleFound) throw new AppError('Schedule not found!', 404);

      const scheduleUpdated = await this.scheduleRepository.update(
        scheduleFound.id,
        {
          status,
        },
      );

      return scheduleUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
