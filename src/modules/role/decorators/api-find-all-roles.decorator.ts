import { applyDecorators } from '@nestjs/common';
import { RoleDto } from '../dtos/role.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiFindAllRoles() {
  return applyDecorators(
    ApiOperation({
      operationId: 'findAllRoles',
      description: 'It finds all roles.',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: [RoleDto],
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
