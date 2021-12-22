import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateServiceOrderProduct1640127113065
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_order_product',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'order_service_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'product_id',
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
      'service_order_product',
      new TableForeignKey({
        name: 'ServiceOrderProductFK',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'service_order_product',
      new TableForeignKey({
        name: 'ProductServiceOrderFK',
        columnNames: ['order_service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_service',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_order_product');
    await queryRunner.dropForeignKey(
      'service_order_product',
      'ServiceOrderProductFK',
    );
    await queryRunner.dropForeignKey(
      'service_order_product',
      'ProductServiceOrderFK',
    );
  }
}
