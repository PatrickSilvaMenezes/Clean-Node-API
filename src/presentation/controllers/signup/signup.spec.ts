import { SignUpController } from './signup'
import { MissingParamError, ServerError } from '../../errors'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Validation } from './signup-protocols'
import { ok, badRequest, serverError } from '../../helpers/http-helper'

const makeFakeRequest = () => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@example.com',
    password: 'valid_password',
    confirmPassword: 'valid_password'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return new Error()
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AddAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@example.com',
        password: 'valid_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  // test('Should return 500 if AddAccount throws', async () => {
  //   const { sut, addAccountStub } = makeSut()
  //   jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
  //     return new Promise((resolve, reject) => reject(new Error()))
  //   })
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse.statusCode).toEqual(500)
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   expect(httpResponse).toEqual(serverError(new ServerError(null))) // Use serverError() helper function
  // })

  // test('Should call AddAccount with correct values', async () => {
  //   const { sut, addAccountStub } = makeSut()
  //   const addSpy = jest.spyOn(addAccountStub, 'add')
  //   const httpRequest = makeFakeRequest()
  //   await sut.handle(httpRequest)
  //   expect(addSpy).toHaveBeenCalledWith({
  //     name: 'valid_name',
  //     email: 'valid_email@example.com',
  //     password: 'valid_password',
  //     confirmPassword: 'valid_password'
  //   })
  // })

  // test('Should return 200 if valid data is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(ok(makeAddAccount()))
  // })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
