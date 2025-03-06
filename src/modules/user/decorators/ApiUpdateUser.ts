import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({
      operationId: 'updateUser',
      description: 'It updates an user by id.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: CreateUserDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          example: {
            message: [
              'firstName must be a string',
              'lastName must be a string',
              'active must be a boolean value',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not found',
      content: {
        'application/json': {
          example: {
            message: 'Not found',
            statusCode: 404,
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      content: {
        'application/json': {
          example: {
            message: 'Internal server error',
            statusCode: 500,
          },
        },
      },
    }),
  );
}
