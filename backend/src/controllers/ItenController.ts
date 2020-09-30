import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Iten from '../models/Iten'
import Order from '../models/Order'

class ItenController {
  async store(request: Request, response: Response) {
    const {
      order_id,
      product_id,
      unitary_value,
      total_value,
      amount
    } = request.body

    try {
      const itenRepository = getRepository(Iten)

      const iten = itenRepository.create({
        order_id,
        product_id,
        unitary_value,
        total_value,
        amount
      })

      await itenRepository.save(iten)

      return response.status(201).json(iten)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params
    try {
      const itenRepository = getRepository(Iten)

      const itens = await itenRepository.findByIds([id])

      return response.json(itens[0])
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async index(request: Request, response: Response) {
    try {
      const itenRepository = getRepository(Iten)

      const itens = await itenRepository.find()

      return response.json(itens)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const {
      order_id,
      product_id,
      unitary_value,
      total_value,
      amount
    } = request.body

    try {
      const itenRepository = getRepository(Iten)

      const iten = await itenRepository.findOne({ where: { id } })

      if (!iten) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a client on our database'
          })
      }

      await itenRepository.update(iten, {
        order_id,
        product_id,
        unitary_value,
        total_value,
        amount
      })
      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params

    try {
      const itenRepository = getRepository(Iten)
      const orderRepository = getRepository(Order)

      const iten = await itenRepository.findOne({ where: { id } })

      if (!iten) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a iten on our database'
          })
      }

      const { order_id } = iten

      const order = await orderRepository.findOne({ where: { id: order_id } })

      const total = iten.total_value

      if (!order) {
        return response.status(400)
      }

      const newOrder = {
        ...order,
        total: Number(order?.total) - Number(total)
      }

      await orderRepository.update(order_id, newOrder)

      await itenRepository.remove(iten)

      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new ItenController()
