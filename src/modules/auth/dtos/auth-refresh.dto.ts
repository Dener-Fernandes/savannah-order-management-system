import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthRefreshDto {
  @ApiProperty({
    type: 'string',
    description: 'refreshToken.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  refreshToken: string;
}
