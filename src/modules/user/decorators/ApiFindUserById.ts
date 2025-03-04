import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/common/doc/responses/user/user.response';

export function ApiFindUserById() {
  return applyDecorators(
    ApiOperation({
      operationId: 'findUser',
      description: 'It finds an user by id.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: UserResponseDto,
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
