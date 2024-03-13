import { v4 as uuidv4 } from 'uuid'
import { type IUuid } from '../interfaces/indexInterfaces'

export class Uuid implements IUuid {
  constructor (value?: string) {
    if (value !== undefined) {
      if (!this.isValid(value)) {
        throw new Error()
      }
    }
  }

  private isValid (value: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (value?.match(regex) === null) {
      return false
    }
    return true
  }

  generate (): string {
    return uuidv4()
  }
}
