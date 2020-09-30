import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class createTableOrders1600968561216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'client_id',
            type: 'uuid'
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'total',
            type: 'decimal(8,2)'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'orderUser',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'orderUser')

    await queryRunner.dropTable('orders')
  }
}
