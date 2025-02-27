import { Exclude, Expose } from 'class-transformer';
import { UserCreatableInterface } from '../interfaces';
import { IsEmail, IsString } from 'class-validator';

@Exclude()
export class CreateUserDto implements UserCreatableInterface {
  @Expose()
  id?: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  @IsEmail()
  lastName: string;
}
