import { AccountModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...account })
    return { ...account, id: result.insertedId.toString() }
  }
}
