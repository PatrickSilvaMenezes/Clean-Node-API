import { MissingParamError } from "../../errors";
import { Validation } from "./validation";

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string;
  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error | null {
    if (input[this.fieldName]) {
      console.log("all params provided in required field validation");
    }
    return new MissingParamError(this.fieldName);
  }
}