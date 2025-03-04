import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/common/doc/responses/user/user.response';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({
      operationId: 'createUser',
      description: 'It creates a user.',
    }),
    ApiResponse({
      status: 201,
      description: 'Created',
      type: UserResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          example: {
            message: [
              'Email address already exists.',
              'email must be an email',
              'email must be a string',
              'userName must be a string',
              'password must be a string',
              'firstName must be a string',
              'lastName must be a string',
            ],
            error: 'Bad Request',
            statusCode: 400,
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
