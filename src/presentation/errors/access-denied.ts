export class AccessDeniedError implements Error {
  name: string
  message: string
  stack?: string

  constructor() {
    this.name = 'AccessDeniedError'
    this.message = 'Access denied.'
  }
}
