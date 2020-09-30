import { Router } from 'express'

import ProductController from '../controllers/ProductController'

const productsRouter = Router()

productsRouter.post('/', ProductController.store)
productsRouter.get('/', ProductController.index)
productsRouter.get('/:id', ProductController.getById)
productsRouter.patch('/:id', ProductController.update)
productsRouter.delete('/:id', ProductController.delete)

export default productsRouter
