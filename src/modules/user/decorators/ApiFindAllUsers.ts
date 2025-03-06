import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';

export function ApiFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      operationId: 'findAllUsers',
      description: 'It finds all users.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: [CreateUserDto],
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
