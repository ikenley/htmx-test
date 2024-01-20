const MESSAGE = "Forbidden";

export default class ForbiddenException extends Error {
  status: number;
  message: string;

  constructor() {
    super(MESSAGE);
    this.status = 403;
    this.message = MESSAGE;
  }
}
