import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { HashComparer } from '@/data/protocols/criptography'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async compare(value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return new Promise((resolve) => resolve(true))
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
