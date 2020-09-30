import { Router } from 'express'

import OrderController from '../controllers/OrderController'

const ordersRouter = Router()

ordersRouter.post('/', OrderController.store)
ordersRouter.get('/', OrderController.index)
ordersRouter.get('/:id', OrderController.getById)
ordersRouter.patch('/:id', OrderController.update)
ordersRouter.delete('/:id', OrderController.delete)

export default ordersRouter
