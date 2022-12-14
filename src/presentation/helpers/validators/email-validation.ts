import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator, Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: unknown): Error {
    if (!this.emailValidator.isValid(input[this.fieldName]))
      return new InvalidParamError(this.fieldName)
  }
}
