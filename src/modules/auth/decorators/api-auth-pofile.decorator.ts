import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dtos/user.dto';

export function AuthProfile() {
  return applyDecorators(
    ApiOperation({
      operationId: 'authProfile',
      description: 'It return an user profile.',
    }),
    ApiResponse({
      status: 201,
      description: 'Created',
      type: UserDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      content: {
        'application/json': {
          example: {
            message: 'Unauthorized',
            statusCode: 401,
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
