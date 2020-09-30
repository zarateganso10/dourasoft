import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from 'typeorm'

import Order from '../models/Order'

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  address: string

  @OneToMany((type) => Order, (order) => order.client)
  orders: Order[]
}

export default Client
