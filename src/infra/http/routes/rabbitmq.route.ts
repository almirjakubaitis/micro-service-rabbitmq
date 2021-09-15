import express from 'express'
import RabbitmqServer from 'shared/infra/rabbitmq'

const rabbitmqRouter = express.Router()

rabbitmqRouter.post('/create', async (req, res, _next) => {
  const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

  const message = JSON.stringify(req.body)

  await server.start()

  // await server.publishInQueue('rabbitmq', message)
  await server.publishInExchange('amq.direct', 'rabbitmq_route', message)

  // res.json({ name: 'Rabbit MQ', type: 'node lib', points: 371 })
  res.json(req.body)
})

rabbitmqRouter.get('/read', async (req, res, _next) => {
  const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

  await server.start()
  await server.consume(
    'rabbitmq',
    message => console.log(message.content.toString())
    // console.log(message.content.toString())
  )

  res.status(200).send()
})

// const getAllMessages = async () => {
//   const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

//   await server.start()
//   await server.consume('rabbitmq', message =>
//     console.log(message.content.toString())
//   )
// }

// getAllMessages()

export { rabbitmqRouter }
