import {
  badRequest,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper'
import {
  AddAccount,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { email, name, password } = httpRequest.body

      const account = await this.addAccount.add({ email, name, password })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
