import { MigrationInterface, QueryRunner } from 'typeorm';
import CategorySeed from '../seeds/CategorySeed.seed';

export class SeedCategory1640207622143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('category', ['name'])
      .values(CategorySeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
