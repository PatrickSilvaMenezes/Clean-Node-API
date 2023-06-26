import { SignUpController } from "../../presentation/controllers/signup/signup";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountPrismaRepository } from "../../infra/db/prisma/account-repository/account";
import { makeSignUpValidation } from "./signup-validation";

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPrismaRepository = new AccountPrismaRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPrismaRepository)
  return new SignUpController(dbAddAccount, makeSignUpValidation())
}