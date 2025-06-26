import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor(message = 'Limite de requisições excedido') {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}
