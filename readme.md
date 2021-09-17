# Rabbit MQ Server

<p align="center">
  <img alt="Planner" src=".github/RabbitMQ-Hero-queues-desktop.svg" width="100%">
</p>

## Tecnologies:
- [ ] Nodejs
- [ ] Rabbit MQ
- [ ] Docker

## Libs:
- [ ] amqplib | @types/amqplib -D (https://github.com/squaremo/amqp.node)

## Run
- [ ] yarn
- [ ] docker compose up -d
- [ ] yarn dev

## Usage of learning test
- [ ] Simple Test express route: http://localhost:3333/test (get)
- [ ] Create a message route: http://localhost:3333/rabbitmq/create (post)
`{
	"name": "Rabbit MQ",
  "type": "node lib",
  "points": 1800
}`
- [ ] Get messages route (the server.ts does it automatically): http://localhost:3333/rabbitmq/read (get)
- [ ] Delete queues route: http://localhost:3333/rabbitmq/delete

## Why this Routes and Tests
This test was created to simulate an environment in which a message can trigger a service and, if that service returns an error, a new message queue is created. This way the queue can be reprocessed or analyzed later. Something very common when sending emails or api services

- [ ] This Tests create a message and exchanges in the post route
- [ ] If a message contains a "node lib" type it reads messageId and console.log
- [ ] If a message not contains a "node lib" type it send message to another route/queue

## Modify files and test for yourself
- [ ] Edit routes/rabbit.route.ts
- [ ] Edit rabbitmq/index.ts

## Why Rabbit MQ
RabbitMQ is a message broker: it accepts and forwards messages. You can think about it as a post office: when you put the mail that you want posting in a post box, you can be sure that the letter carrier will eventually deliver the mail to your recipient. In this analogy, RabbitMQ is a post box, a post office, and a letter carrier.

The major difference between RabbitMQ and the post office is that it doesn't deal with paper, instead it accepts, stores, and forwards binary blobs of data ‒ messages.

