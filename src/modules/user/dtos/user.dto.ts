import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { UserInterface } from '../interfaces';

import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
} from '../constants/user.constant';
import { CommonEntityDto } from 'src/common/dtos/common-entity.dto';

@Exclude()
export class UserDto
  extends CommonEntityDto
  implements Omit<UserInterface, 'salt' | 'password'>
{
  id: string;

  @Expose()
  @IsString()
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  userName!: string;

  @Expose()
  @IsString()
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  firstName!: string;

  @Expose()
  @IsString()
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  lastName!: string;

  @Expose()
  @IsEmail()
  @MinLength(USER_EMAIL_MIN_LENGTH)
  @MaxLength(USER_EMAIL_MAX_LENGTH)
  email!: string;

  @Expose()
  @IsBoolean()
  @Type(() => Boolean)
  active!: boolean;

  createdAt: Date;

  updatedAt: Date;
}
