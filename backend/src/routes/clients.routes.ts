import { Router } from 'express'

import ClientController from '../controllers/ClientController'

const clientsRouter = Router()

clientsRouter.post('/', ClientController.store)
clientsRouter.get('/', ClientController.index)
clientsRouter.get('/:id', ClientController.getById)
clientsRouter.patch('/:id', ClientController.update)
clientsRouter.delete('/:id', ClientController.delete)

export default clientsRouter
