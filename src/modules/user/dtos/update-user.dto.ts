import { Exclude, Expose } from 'class-transformer';
import { UserUpdatableInterface } from '../interfaces';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UpdateUserDto implements UserUpdatableInterface {
  @ApiProperty({ example: 'Rick' })
  @Expose()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Deckard' })
  @Expose()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'true' })
  @Expose()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
