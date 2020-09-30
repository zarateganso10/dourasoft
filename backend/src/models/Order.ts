import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import Client from './Client'

import Iten from './Iten'

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  client_id: string

  @ManyToOne((type) => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client

  @Column()
  status: string

  @Column()
  total: number

  @CreateDateColumn()
  date: Date

  @OneToMany((type) => Iten, (iten) => iten.order)
  itens: Iten[]
}

export default Order
