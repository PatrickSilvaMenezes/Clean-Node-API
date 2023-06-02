import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EmailValidator, Controller, HttpRequest, HttpResponse, Validation } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { AddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(emailValidator: EmailValidator, addAccount: AddAccount, Validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = Validation
  }


  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {

          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, confirmPassword } = httpRequest.body

      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    }
    catch (error) {
      return serverError()
    }

  }
}