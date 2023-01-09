import { AccountModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...account })
    return { ...account, id: result.insertedId.toString() }
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return MongoHelper.map<AccountModel>(account)
  }
}
