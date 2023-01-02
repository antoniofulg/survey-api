import { ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const badRequest = (body: Error): HttpResponse => ({
  statusCode: 400,
  body,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const ok = (body: unknown): HttpResponse => ({
  statusCode: 200,
  body,
})
