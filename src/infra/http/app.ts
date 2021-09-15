import cors from 'cors'
import { config } from 'dotenv-flow'
import express from 'express'

config({ silent: true })

import { routes } from './routes' // eslint-disable-line

const app = express()

// app.use(
//   cors({
//     exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
//   })
// )

// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Access-Token',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  // origin: 'https://www.airsky.com.br',
  preflightContinue: false
}

app.use(cors(options))

app.use(
  express.json({
    type: ['application/json', 'text/plain']
  })
)

app.use(routes)

export { app }
