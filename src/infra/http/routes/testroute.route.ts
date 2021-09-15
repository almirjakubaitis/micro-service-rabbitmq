import express from 'express'

const testRouter = express.Router()

testRouter.get('/', (req, res) => {
  res.json({ name: 'Denilson', type: 'architect', points: 371 })
})

export { testRouter }
