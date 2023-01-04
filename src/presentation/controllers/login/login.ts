import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import {
  badRequest,
  serverError,
  unauthorized,
} from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/controllers/signup/signup-protocols'
import { Authentication } from '@/data/usecases/authentication/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidParamError('email'))

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}
