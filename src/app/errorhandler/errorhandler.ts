export class CustomError extends Error {
  public code: number;
  public stack: string;
  constructor(message: string, code: number = 400, stack?: string) {
    super(message);
    this.code = code;
    this.stack = stack;
    this.name = "CustomError";
  }
}
