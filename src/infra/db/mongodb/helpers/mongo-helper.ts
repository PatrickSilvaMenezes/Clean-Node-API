/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MongoClient } from "mongodb"

export const MongoHelper = {
  async connect(uri: string): Promise<void> {

    let client: MongoClient,

    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    await this.client.close()
  }
}