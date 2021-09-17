import { Channel, connect, Connection, Message, Replies } from 'amqplib'
import { v4 } from 'uuid'

export default class RabbitmqServer {
  private conn: Connection

  private channel: Channel

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    this.channel.assertQueue(queue, { durable: true })

    const messageToJSON = JSON.parse(message)
    const messageId = v4()
    const messageWithId = JSON.stringify(
      Object.assign(messageToJSON, { messageId })
    )

    const publish = this.channel.sendToQueue(
      queue,
      Buffer.from(messageWithId),
      {
        persistent: true,
        messageId
      }
    )

    return publish
  }

  async deleteQueue(queue: string): Promise<void> {
    this.channel.assertQueue(queue, { durable: true })
    this.channel.deleteQueue(queue)
  }

  async deleteExchange(exchange: string): Promise<void> {
    this.channel.deleteExchange(exchange)
  }

  async exchangeFirstConfig(
    exchange: string,
    routingKey: string,
    queue: string,
    type: string
  ): Promise<void> {
    this.channel.assertQueue(queue, { durable: true })

    this.channel.assertExchange(exchange, type, {
      durable: true
    })

    this.channel.bindQueue(queue, exchange, routingKey)
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    queue: string,
    type: string,
    message: string
  ): Promise<boolean> {
    this.channel.assertQueue(queue, { durable: true })

    this.channel.assertExchange(exchange, type, {
      durable: true
    })

    // this.channel.bindQueue(queue, exchange, routingKey)

    const messageToJSON = JSON.parse(message)
    const messageId = v4()
    const messageWithId = JSON.stringify(
      Object.assign(messageToJSON, { messageId })
    )

    return this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(messageWithId),
      {
        persistent: true,
        messageId
      }
    )
  }

  async consume(
    queue: string,
    callback: (message: Message) => void
  ): Promise<Replies.Consume> {
    const consume = this.channel.consume(queue, message => {
      callback(message)
      // this.channel.ack(message) // tira as mensagens da fila
    })

    return consume
  }

  async ackMessage(message: Message): Promise<void> {
    return this.channel.ack(message)
  }
}
