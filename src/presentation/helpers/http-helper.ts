import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (body: Error): HttpResponse => ({
  statusCode: 400,
  body,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
})
