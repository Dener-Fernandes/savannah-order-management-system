import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/common/doc/responses/user/user.response';

export function ApiFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      operationId: 'findAllUsers',
      description: 'It finds all users.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: [UserResponseDto],
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
