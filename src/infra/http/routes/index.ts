import { Router } from 'express'

import { rabbitmqRouter } from './rabbitmq.route'
import { testRouter } from './testroute.route'

const routes = Router()

routes.use('/test', testRouter)
routes.use('/rabbitmq', rabbitmqRouter)

export { routes }
