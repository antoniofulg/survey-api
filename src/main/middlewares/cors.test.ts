import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (_, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-origin', '*')
  })
})
