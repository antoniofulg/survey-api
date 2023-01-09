import { Collection, Document, MongoClient, WithId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(this.uri)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  map: <T>(data: WithId<Document> | null): T => {
    if (!data) return null
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() } as T
  },
}
