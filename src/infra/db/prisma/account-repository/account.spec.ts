import { exec } from 'node:child_process'
import { AccountPrismaRepository } from './account'
import { PrismaHelper } from '../prisma'
import { AccountModel } from '../../../../domain/models/account'
import { randomUUID } from 'node:crypto'
describe('Account Mongo Repository', () => {
  const userDemo: AccountModel = {
    email: "demo@email.com",
    name: "demo",
    password: "demo"
  }
  beforeAll(async () => {
    console.log("rodei")
    exec("npx prisma migrate dev --name v5")
    const dataInserter = new AccountPrismaRepository()
    try {
      await PrismaHelper.user.create({
        data: {
          email: "patrick@mail.com",
          name: "patrick",
          password: "patrick_password"
        }
      })
      await dataInserter.add(userDemo)
      console.log("stub data inserted")
    } catch (error) {
      console.error("an error occurred while insert stub data: \n" + error)
    }
  }),

    test('ensure create new User if valid params passed', async () => {
      const fakeData: AccountModel = {
        email: `${randomUUID()}@example.com`,
        password: '123456',
        name: 'John Doe',
      }
      const sut = new AccountPrismaRepository()
      const { name } = await sut.add(fakeData)
      expect(name).toEqual(fakeData.name)
    })

})