import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string

  constructor(fieldName: string) {
    this.fieldName = fieldName
  }

  validate(input: unknown): Error {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
