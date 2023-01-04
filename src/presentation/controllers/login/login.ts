import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}
