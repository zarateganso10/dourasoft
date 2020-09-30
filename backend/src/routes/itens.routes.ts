import { Router } from 'express'

import ItenController from '../controllers/ItenController'

const itensRouter = Router()

itensRouter.post('/', ItenController.store)
itensRouter.get('/', ItenController.index)
itensRouter.get('/:id', ItenController.getById)
itensRouter.patch('/:id', ItenController.update)
itensRouter.delete('/:id', ItenController.delete)

export default itensRouter
