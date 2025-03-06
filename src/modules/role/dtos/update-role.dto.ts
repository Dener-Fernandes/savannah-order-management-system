import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class UpdateRoleDto {
  @Expose()
  @IsString()
  name: string;
}
