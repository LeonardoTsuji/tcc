import User from '@modules/users/infra/typeorm/entities/User';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedule')
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_schedule: Date;

  @Column()
  status: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  vehicle_id: number;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
