import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError, unauthorized } from "../../helpers/http-helper";
import { Controller, EmailValidator, HttpRequest, HttpResponse, Authentication } from "./login-protocols";



export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {

          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok(httpRequest.body)
    }
    catch (error) {
      return serverError()
    }
  }
}