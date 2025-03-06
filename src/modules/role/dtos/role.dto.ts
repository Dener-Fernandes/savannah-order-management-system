import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';
import { RoleInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class RoleDto extends CommonEntityDto implements RoleInterface {
  @Expose()
  @IsString()
  name: string;
}
