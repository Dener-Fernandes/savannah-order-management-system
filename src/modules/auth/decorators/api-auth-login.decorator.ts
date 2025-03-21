import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { AuthLoginDto } from '../dtos/auth-login.dto';

export function ApiAuthLogin() {
  return applyDecorators(
    ApiBody({
      type: AuthLoginDto,
      description: 'Authenticate user with username and password',
    }),
    ApiOperation({
      operationId: 'authLogin',
      description: 'It authenticates an user.',
    }),
    ApiResponse({
      status: 201,
      description: 'Created',
      type: AuthResponseDto,
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
