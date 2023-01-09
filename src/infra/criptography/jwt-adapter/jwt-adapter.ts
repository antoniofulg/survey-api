import { Encrypter } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {
    this.secret = secret
  }

  async encrypt(value: string): Promise<string> {
    return await jwt.sign({ id: value }, this.secret)
  }
}
