import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Product from '../models/Product'

class ProductController {
  async store(request: Request, response: Response) {
    const { code, name, description, price } = request.body

    try {
      const productRepository = getRepository(Product)

      const product = productRepository.create({
        code,
        name,
        description,
        price
      })

      await productRepository.save(product)

      return response.status(201).json(product)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params
    try {
      const productRepository = getRepository(Product)

      const products = await productRepository.findByIds([id])

      return response.json(products[0])
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async index(request: Request, response: Response) {
    try {
      const productRepository = getRepository(Product)

      const products = await productRepository.find()

      return response.json(products)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { code, name, description, price } = request.body

    try {
      const productRepository = getRepository(Product)

      const product = await productRepository.findOne({ where: { id } })

      if (!product) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a client on our database'
          })
      }

      await productRepository.update(product, {
        code,
        name,
        description,
        price
      })
      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params

    try {
      const productRepository = getRepository(Product)

      const product = await productRepository.findOne({ where: { id } })

      if (!product) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a product on our database'
          })
      }

      await productRepository.delete(product)
      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new ProductController()
