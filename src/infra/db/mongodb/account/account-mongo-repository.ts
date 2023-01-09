import { AccountModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@/data/protocols/db/account'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
{
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...account })
    return { ...account, id: result.insertedId.toHexString() }
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return MongoHelper.map<AccountModel>(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          accessToken: token,
        },
      }
    )
  }
}
