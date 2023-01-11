export class EmailInUseError implements Error {
  name: string
  message: string
  stack?: string

  constructor() {
    this.name = 'EmailInUseError'
    this.message = 'The received email is already in use'
  }
}
