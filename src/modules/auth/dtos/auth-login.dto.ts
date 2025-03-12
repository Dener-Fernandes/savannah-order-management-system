import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { AuthLoginInterface } from '../interfaces/auth-login.interface';

@Exclude()
export class AuthLoginDto implements AuthLoginInterface {
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'username.',
  })
  @IsString()
  username: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'password.',
  })
  @IsString()
  password: string;
}
