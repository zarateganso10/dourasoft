import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import Product from './Product'
import Order from './Order'

@Entity('itens')
class Iten {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  order_id: string

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column()
  product_id: string

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  amount: number

  @Column()
  unitary_value: number

  @Column()
  total_value: number
}

export default Iten
