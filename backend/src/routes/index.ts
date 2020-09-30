import { Router } from 'express'

import productsRouter from './products.routes'
import ordersRouter from './orders.routes'
import clientsRouter from './clients.routes'
import itensRouter from './itens.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/orders', ordersRouter)
routes.use('/clients', clientsRouter)
routes.use('/itens', itensRouter)

export default routes
