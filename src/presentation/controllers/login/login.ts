import { MissingParamError } from "../../errors";
import { badRequest, ok } from "../../helpers/http-helper";
import { Controller, EmailValidator, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    this.emailValidator.isValid(httpRequest.body.email)
    return ok(httpRequest.body)
  }
}