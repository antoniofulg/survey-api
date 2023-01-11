import {
  badRequest,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper'
import {
  AddAccount,
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { email, name, password } = httpRequest.body

      await this.addAccount.add({ email, name, password })

      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
