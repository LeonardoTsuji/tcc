import Product from '@modules/products/infra/typeorm/entities/Product';
import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';
import User from '@modules/users/infra/typeorm/entities/User';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('budget')
class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expiration_date: Date;

  @Column()
  payment_method: string;

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

  @Column()
  schedule_id: number;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @ManyToMany(() => Product, product => product.budgets, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'budget_product',
    joinColumn: {
      name: 'budget_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Budget;
