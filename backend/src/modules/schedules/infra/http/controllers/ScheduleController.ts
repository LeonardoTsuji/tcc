import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import DeleteScheduleService from '@modules/schedules/services/DeleteScheduleService';
import FindScheduleByIdService from '@modules/schedules/services/FindScheduleByIdService';
import ListSchedulesService from '@modules/schedules/services/ListSchedulesService';
import UpdateScheduleService from '@modules/schedules/services/UpdateScheduleService';
import {
  Body,
  Delete,
  Get,
  Inject,
  Path,
  Post,
  Put,
  Query,
  Security,
  SuccessResponse,
} from 'tsoa';
import { container } from 'tsyringe';
import Schedule from '../../typeorm/entities/Schedule';

export default class ScheduleController {
  @Post('/')
  @SuccessResponse('201', 'CREATED')
  public async create(
    @Body() { date_schedule, vehicle_id }: ICreateSchedule,
    @Inject() userId: number,
  ): Promise<Schedule | undefined> {
    const createSchedule = container.resolve(CreateScheduleService);

    const scheduleCreated = await createSchedule.execute({
      user_id: userId,
      date_schedule,
      vehicle_id,
    });

    return scheduleCreated;
  }

  @Security('api_key', ['project:read'])
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async show(@Query() name?: string): Promise<Schedule[] | undefined> {
    const listSchedules = container.resolve(ListSchedulesService);

    const schedules = await listSchedules.execute({
      name,
    });

    return schedules;
  }

  @Security('api_key', ['project:read'])
  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async index(@Path() id: number): Promise<Schedule | undefined> {
    const findSchedule = container.resolve(FindScheduleByIdService);

    const schedule = await findSchedule.execute(id);

    return schedule;
  }

  @Security('api_key', ['project:read'])
  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async update(
    @Path() id: number,
    @Body() { name }: IUpdateSchedule,
  ): Promise<Schedule | undefined> {
    const scheduleUpdate = container.resolve(UpdateScheduleService);

    const scheduleUpdated = await scheduleUpdate.execute({
      name,
      id,
    });

    return scheduleUpdated;
  }

  @Security('api_key', ['project:read'])
  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  public async delete(@Path() id: number): Promise<Schedule | undefined> {
    const scheduleDelete = container.resolve(DeleteScheduleService);

    const scheduleDeleted = await scheduleDelete.execute(id);

    return scheduleDeleted;
  }
}
