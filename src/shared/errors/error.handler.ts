import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorsEntity } from './error.schema';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @InjectRepository(ErrorsEntity)
    private readonly errorRepository: Repository<ErrorsEntity>,
  ) {
    super();
  }

  async catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();

    // Log the error to the database
    const errorEntity = new ErrorsEntity();
    errorEntity.message = exception.message;
    errorEntity.statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    errorEntity.path = request.url;
    // Set additional properties or perform any necessary transformations on the error entity

    await this.errorRepository.save(errorEntity);

    // Call the parent implementation to handle other exception types
    super.catch(exception, host);
  }
}
