const MESSAGE = "Unauthorized";

export default class UnauthorizedException extends Error {
  status: number;
  message: string;

  constructor() {
    super(MESSAGE);
    this.status = 401;
    this.message = MESSAGE;
  }
}
