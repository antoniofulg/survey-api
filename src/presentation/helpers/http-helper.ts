import { ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const badRequest = (body: Error): HttpResponse => ({
  statusCode: 400,
  body,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body,
})
