export class Exception extends Error {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  static instance: Exception

  public constructor (message?: string) {
    super(message)
  }

  static callException (text: string): Exception {
    Exception.instance = new Exception(text)

    return Exception.instance
  }

  async getErrorMessage (error: unknown): Promise<string> {
    if (error instanceof Error) return error.message
    return String(error)
  }
}
