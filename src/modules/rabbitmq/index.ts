import RabbitmqServer from 'shared/infra/rabbitmq'

const getAllMessages = async (): Promise<void> => {
  const server = new RabbitmqServer('amqp://admin:123456@localhost:5672')

  await server.start()

  await server.consume('rabbitmq_queue_n1', message => {
    const messageObj = JSON.parse(message.content.toString())

    if (messageObj.type === 'node lib') {
      server.ackMessage(message)
    } else {
      // CREATE A NEW PUBLISH QUEUE WITH OTHER TYPES
      server.publishInExchange(
        'amq.direct',
        'rabbitmq_route_n2',
        'rabbitmq_queue_n2',
        'direct',
        message.content.toString()
      )
      server.ackMessage(message)
    }

    console.log(message.properties.messageId)
    // console.log(message.content.toString())
  })
}

export { getAllMessages }
