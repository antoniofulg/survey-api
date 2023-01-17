import { AuthMiddleware } from './auth-middleware'
import {
  AccessDeniedError,
  AccountModel,
  AddAccountModel,
  forbidden,
  HttpRequest,
  LoadAccountByToken,
  ok,
  ServerError,
  serverError,
} from './auth-middleware-protocols'

const makeFakeAccount = (
  account: AddAccountModel | null = null
): AccountModel => ({
  id: 'valid_id',
  name: account?.name || 'valid_name',
  email: account?.email || 'valid_email@mail.com',
  password: account?.password || 'hashed_valid_password',
})

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
})

const makeLoadAccountByToken = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}

const makeSut = (role?: string) => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return { sut, loadAccountByTokenStub }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(
        new Promise((_, reject) => reject(new ServerError(null)))
      )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
