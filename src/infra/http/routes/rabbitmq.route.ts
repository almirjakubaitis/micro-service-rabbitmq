import express from 'express'
import RabbitmqServer from 'shared/infra/rabbitmq'

const rabbitmqRouter = express.Router()

rabbitmqRouter.post('/create', async (req, res, _next) => {
  const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

  const message = JSON.stringify(req.body)

  await server.start()

  // PUBLISH IN QUEUE
  // await server.publishInQueue('rabbitmq_queue_n1', message)

  // PUBLISH IN EXCHANGE QUEUE NUMBER 1

  await server.exchangeFirstConfig(
    'amq.direct',
    'rabbitmq_route_n1',
    'rabbitmq_queue_n1',
    'direct'
  )

  await server.exchangeFirstConfig(
    'amq.direct',
    'rabbitmq_route_n2',
    'rabbitmq_queue_n2',
    'direct'
  )

  await server.publishInExchange(
    'amq.direct',
    'rabbitmq_route_n1',
    'rabbitmq_queue_n1',
    'direct',
    message
  )

  // res.json({ name: 'Rabbit MQ', type: 'node lib', points: 371 })
  res.json(req.body)
})

rabbitmqRouter.get('/read', async (req, res, _next) => {
  const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

  await server.start()
  await server.consume('rabbitmq', message => {
    const messageObj = JSON.parse(message.content.toString())

    if (messageObj.type === 'node lib') {
      server.ackMessage(message)
    }

    // console.log(message.properties.messageId)
    // console.log(message.content.toString())
  })

  res.status(200).send()
})

rabbitmqRouter.delete('/delete', async (req, res, _next) => {
  const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

  await server.start()

  // PUBLISH IN QUEUE
  // await server.publishInQueue('rabbitmq_queue_n1', message)

  // PUBLISH IN EXCHANGE QUEUE NUMBER 1

  await server.deleteQueue('rabbitmq')
  await server.deleteQueue('rabbitmq_queue_n1')
  await server.deleteQueue('rabbitmq_queue_n2')
  // await server.deleteExchange('amq.direct')

  // res.json({ name: 'Rabbit MQ', type: 'node lib', points: 371 })
  res.status(200).send()
})

export { rabbitmqRouter }
