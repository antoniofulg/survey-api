export class UnauthorizedError implements Error {
  name: string
  message: string

  constructor() {
    this.message = 'Unauthorized'
    this.name = 'UnauthorizedError'
  }
}
