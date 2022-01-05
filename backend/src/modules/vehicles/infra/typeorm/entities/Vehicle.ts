import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Model from '@modules/models/infra/typeorm/entities/Model';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vehicle')
class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plate: string;

  @Column()
  color: string;

  @Column()
  year: number;

  @Column()
  kilometer: number;

  @Column()
  brand_id: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  model_id: number;

  @ManyToOne(() => Model)
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vehicle;
