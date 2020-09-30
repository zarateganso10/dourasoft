import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Client from '../models/Client'

class ClientController {
  async store(request: Request, response: Response) {
    const { name, phone, address } = request.body

    try {
      const clientRepository = getRepository(Client)

      const client = clientRepository.create({ name, phone, address })

      await clientRepository.save(client)

      return response.status(201).json(client)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params
    try {
      const clientRepository = getRepository(Client)

      const clients = await clientRepository.findByIds([id])

      return response.json(clients[0])
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async index(request: Request, response: Response) {
    try {
      const clientRepository = getRepository(Client)

      const clients = await clientRepository.find()

      return response.json(clients)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { name, phone, address } = request.body

    try {
      const clientRepository = getRepository(Client)

      const client = await clientRepository.findOne({ where: { id } })

      if (!client) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a client on our database'
          })
      }

      await clientRepository.update(client, { name, phone, address })
      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params

    try {
      const clientRepository = getRepository(Client)

      const client = await clientRepository.findOne({ where: { id } })

      if (!client) {
        return response
          .status(400)
          .json({
            error: 'This ID doesn`t correspond to a client on our database'
          })
      }

      await clientRepository.delete(client)
      return response.json()
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new ClientController()
