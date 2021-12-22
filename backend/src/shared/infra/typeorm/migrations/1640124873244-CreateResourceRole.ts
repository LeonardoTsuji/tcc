import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateResourceRole1640124873244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'resource_role',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'permission',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'resource_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'resource_role',
      new TableForeignKey({
        name: 'ResourceRoleFK',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'resource_role',
      new TableForeignKey({
        name: 'RoleResourceFK',
        columnNames: ['resource_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'resource',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('resource_role');
    await queryRunner.dropForeignKey('resource_role', 'ResourceRoleFK');
    await queryRunner.dropForeignKey('resource_role', 'RoleResourceFK');
  }
}
