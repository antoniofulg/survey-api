import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const ok = (body: unknown): HttpResponse => ({
  statusCode: 200,
  body,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
})

export const badRequest = (body: Error): HttpResponse => ({
  statusCode: 400,
  body,
})

export const forbidden = (body: Error): HttpResponse => ({
  statusCode: 403,
  body,
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})
