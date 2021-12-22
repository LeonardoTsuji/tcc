import { MigrationInterface, QueryRunner } from 'typeorm';
import RoleSeed from '../seeds/RoleSeed.seed';

export class SeedRole1640207561539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role', ['name', 'description'])
      .values(RoleSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
