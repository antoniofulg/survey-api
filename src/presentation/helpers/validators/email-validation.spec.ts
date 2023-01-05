import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/presentation/protocols'
import { EmailValidation } from './email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return !!email
    }
  }
  return new EmailValidatorStub()
}

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub,
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator return false', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.validate({ email: 'any_email@mail.com' })
    expect(httpResponse).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const email = 'any_email@email.com'
    sut.validate({ email })
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
