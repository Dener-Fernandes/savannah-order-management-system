import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { UserRoleInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { RoleDto } from 'src/modules/role/dtos/role.dto';

export class UserRoleDto extends CommonEntityDto implements UserRoleInterface {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'd76868f7-4b24-4f1e-ab21-0bf8b9f03037',
    format: 'uuid',
  })
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  roleId: string;

  // It is not showing the role in the response, although it is in the docs.
  @ApiProperty({ type: () => RoleDto, required: false })
  @Expose()
  role: RoleDto;
}
