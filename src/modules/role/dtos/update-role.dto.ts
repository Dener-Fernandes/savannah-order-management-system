import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class UpdateRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @Expose()
  @IsString()
  name: string;
}
