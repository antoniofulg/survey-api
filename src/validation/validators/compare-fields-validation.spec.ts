import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = () => new CompareFieldsValidation('field', 'fieldToCompare')

describe('Compare Fields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'wrong_name',
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'any_name',
    })
    expect(error).toBeFalsy()
  })
})
