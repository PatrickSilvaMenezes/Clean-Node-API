import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { BcryptAdapter } from "../../../criptography/bcrypt-adapter";
import { PrismaHelper } from "../prisma";

export class AccountPrismaRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AddAccountModel> {
    const hasher = new BcryptAdapter(12)
    const hashedPassword = await hasher.encrypt(accountData.password)
    const response = await PrismaHelper.user.create({
      data: {
        email: accountData.email,
        name: accountData.name,
        password: hashedPassword
      },
      select: {
        name: true,
        email: true,
        password: true
      }
    })
    return response
  }
}