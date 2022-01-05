import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Schedule from '../infra/typeorm/entities/Schedule';
import IScheduleRepository from '../repositories/IScheduleRepository';

@injectable()
export default class CreateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({
    date_schedule,
    vehicle_id,
    user_id,
  }: ICreateSchedule): Promise<Schedule | undefined> {
    try {
      if (!date_schedule || !vehicle_id || !user_id) {
        throw new AppError(
          'Incomplete data for creating a new schedule, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          name,
        },
      });

      const newSchedule: Schedule = await this.scheduleRepository.save({
        date_schedule,
        vehicle_id,
        user_id,
        status: 'ATIVO',
      });

      this.log.INFO({
        message: 'scheduleRepository.save',
        result: {
          model: JSON.stringify(newSchedule),
        },
      });

      return newSchedule;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
