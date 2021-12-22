import { MigrationInterface, QueryRunner } from 'typeorm';
import BrandSeed from '../seeds/BrandSeed.seed';

export class SeedBrand1640207605864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('brand', ['name'])
      .values(BrandSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
