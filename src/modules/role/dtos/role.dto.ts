import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { RoleInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RoleDto extends CommonEntityDto implements RoleInterface {
  @ApiProperty({ example: 'ADMIN' })
  @Expose()
  @IsString()
  name: string;
}
