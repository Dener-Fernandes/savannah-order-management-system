import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRoleDto } from '../dtos/user-role.dto';

export function ApiCreateUserRole() {
  return applyDecorators(
    ApiOperation({
      operationId: 'createUSerRole',
      description: 'It creates an user role.',
    }),
    ApiResponse({
      status: 201,
      description: 'Created',
      type: UserRoleDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          example: {
            message: ['userId must be a UUID', 'roleId must be a UUID'],
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
