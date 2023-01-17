import { LoginController } from '@/presentation/controllers/auth/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller =>
  makeLogControllerDecorator(
    new LoginController(makeDbAuthentication(), makeLoginValidation())
  )
