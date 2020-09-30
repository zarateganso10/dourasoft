import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Order from '../models/Order'
import Iten from '../models/Iten'

class OrderController {
  async store(request: Request, response: Response) {
    const { client_id, itens, status, total } = request.body

    try {
      const orderRepository = getRepository(Order)
      const itenRepository = getRepository(Iten)

      const order = orderRepository.create({ client_id, status, total })

      await orderRepository.save(order)

      const itensCreated = itenRepository.create(
        itens.map((iten: Iten) => ({
          ...iten,
          order_id: order.id
        }))
      )

      const orderCreated = {
        ...order,
        itens: [...itensCreated]
      }

      await itenRepository.save(itensCreated)

      return response.status(201).json(orderCreated)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params
    try {
      const orderRepository = getRepository(Order)

      const orders = await orderRepository.find({
        where: { id },
        relations: ['itens', 'itens.product']
      })

      return response.json(orders[0])
    } catch (error) {
      console.log(error)
      return response.status(400).json(error)
    }
  }

  async index(request: Request, response: Response) {
    try {
      const orderRepository = getRepository(Order)

      const orders = await orderRepository.find({
        relations: ['itens', 'client', 'itens.product']
      })

      return response.json(orders)
    } catch (error) {
      console.log(error.message)
      return response.status(400).json(error)
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { client_id, status } = request.body

    try {
      const orderRepository = getRepository(Order)

      const order = await orderRepository.findOne({ where: { id } })

      if (!order) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a client on our database'
          })
      }

      await orderRepository.update({ id }, { client_id, status })
      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params

    try {
      const orderRepository = getRepository(Order)

      const order = await orderRepository.findOne({ where: { id } })

      if (!order) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a order on our database'
          })
      }

      await orderRepository.remove(order)

      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new OrderController()
