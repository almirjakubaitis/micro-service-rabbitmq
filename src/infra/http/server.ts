import 'reflect-metadata'
import { getAllMessages } from '@modules/rabbitmq'

import { app } from './app'

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})

getAllMessages()
