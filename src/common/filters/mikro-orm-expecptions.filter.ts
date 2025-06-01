import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { OptimisticLockError, NotFoundError } from '@mikro-orm/core';
import { Response } from 'express';

@Catch(OptimisticLockError, NotFoundError)
export class MikroOrmExceptionFilter implements ExceptionFilter {
  public catch(
    exception: OptimisticLockError | NotFoundError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode: HttpStatus;
    let message: string;

    switch (true) {
      case exception instanceof OptimisticLockError:
        statusCode = HttpStatus.CONFLICT;
        message =
          'The resource was modified by another process. Please refresh your data and try again.';
        break;

      case exception instanceof NotFoundError:
        statusCode = HttpStatus.NOT_FOUND;
        message = 'The requested resource was not found.';
        break;

      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'An unexpected internal server error occurred.';
    }

    const body = { statusCode, message };
    response.status(statusCode).json(body);
  }
}
