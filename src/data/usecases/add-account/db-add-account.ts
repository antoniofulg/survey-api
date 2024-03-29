import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountByEmail = await this.loadAccountByEmailRepository.loadByEmail(
      account.email
    )
    if (!accountByEmail) {
      const password = await this.hasher.hash(account.password)
      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, account, { password })
      )
      return newAccount
    }
    return null
  }
}
