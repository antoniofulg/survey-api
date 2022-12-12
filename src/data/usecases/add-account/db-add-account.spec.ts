import {
  AccountModel,
  AddAccountModel,
  Encrypter,
  AddAccountRepository,
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve(`hashed_${value}`))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: account.name,
        email: account.email,
        password: `hashed_${account.password}`,
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

type SutTypes = {
  addAccountRepositoryStub: AddAccountRepository
  encrypterStub: Encrypter
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    addAccountRepositoryStub,
    encrypterStub,
    sut,
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }
    sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_valid_password',
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
