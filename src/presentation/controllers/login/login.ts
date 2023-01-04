import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
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
      const { email, password } = httpRequest.body
      if (!email)
        return new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('email')))
        )
      if (!password)
        return new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('password')))
        )

      if (!this.emailValidator.isValid(email))
        return new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError('email')))
        )

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
