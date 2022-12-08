import { EmailValidator } from '@/presentation/controllers/signup/signup-protocols'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false
  }
}
