import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRoleDto } from '../dtos/user-role.dto';

export function ApiFindAllUserRoles() {
  return applyDecorators(
    ApiOperation({
      operationId: 'findAllUserRoles',
      description: 'It finds all user roles.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: [UserRoleDto],
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
