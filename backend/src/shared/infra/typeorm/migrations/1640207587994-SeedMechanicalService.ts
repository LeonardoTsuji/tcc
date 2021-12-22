import { MigrationInterface, QueryRunner } from 'typeorm';
import MechanicalServiceSeed from '../seeds/MechanicalServiceSeed.seed';

export class SeedMechanicalService1640207587994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('mechanical_service', ['name', 'description', 'price'])
      .values(MechanicalServiceSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
