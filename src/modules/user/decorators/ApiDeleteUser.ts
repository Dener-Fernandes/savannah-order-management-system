import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({
      operationId: 'deleteUser',
      description: 'It deletes an user by id.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
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
