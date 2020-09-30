import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class createTableItens1600968780374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'itens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'order_id',
            type: 'uuid'
          },
          {
            name: 'product_id',
            type: 'uuid'
          },
          {
            name: 'amount',
            type: 'int'
          },
          {
            name: 'unitary_value',
            type: 'decimal(8,2)'
          },
          {
            name: 'total_value',
            type: 'decimal(8,2)'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'itens',
      new TableForeignKey({
        name: 'itenOrder',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'itens',
      new TableForeignKey({
        name: 'itenProduct',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('itens', 'itenOrder')

    await queryRunner.dropForeignKey('itens', 'itenProduct')

    await queryRunner.dropTable('itens')
  }
}
