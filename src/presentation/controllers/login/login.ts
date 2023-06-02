import { Authentication } from "../../../domain/usecases/authentication";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { Controller, EmailValidator, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const { email, password } = httpRequest.body
      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
      await this.authentication.auth(email, password)

      return ok(httpRequest.body)
    }
    catch (error) {
      return serverError()
    }
  }
}