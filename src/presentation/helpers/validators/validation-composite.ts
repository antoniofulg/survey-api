import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {
    this.validations = validations
  }

  validate(input: unknown): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) return error
    }
  }
}
