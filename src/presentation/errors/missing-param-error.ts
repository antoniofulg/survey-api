export class MissingParamError implements Error {
  name: string
  message: string
  stack?: string

  constructor(paramName: string) {
    this.message = `Missing param: ${paramName}`
    this.name = 'MissingParamError'
  }
}
