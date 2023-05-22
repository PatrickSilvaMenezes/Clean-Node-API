/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Collection, MongoClient } from "mongodb"

export const MongoHelper = {
  async connect(uri: string): Promise<void> {

    let client: MongoClient

    this.client = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    await this.client.close()
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }
}