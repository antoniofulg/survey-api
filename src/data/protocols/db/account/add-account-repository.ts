import { AddAccountModel } from '@/domain/usecases/add-account'
import { AccountModel } from '@/data/usecases/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add(account: AddAccountModel): Promise<AccountModel>
}
