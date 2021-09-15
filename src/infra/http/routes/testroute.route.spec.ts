import 'reflect-metadata'

import { testRouter } from './testroute.route'

describe('TestRoute', () => {
  it('should be ablle to show a route', () => {
    const route = testRouter.get('/', (req, res) => {
      res.json({ name: 'Denilson', type: 'architect', points: 371 })
    })

    expect(route).toHaveProperty('name')
  })
})
