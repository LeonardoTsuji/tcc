import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('model')
class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  brand_id: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Model;
