import { Exclude, Expose } from 'class-transformer';
import { UserCreatableInterface } from '../interfaces';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateUserDto implements UserCreatableInterface {
  @Expose()
  id?: string;

  @ApiProperty({ example: 'RickDeckard@gmail.com' })
  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'rick-deckard' })
  @Expose()
  @IsString()
  userName: string;

  @ApiProperty({ example: '06102021' })
  @Expose()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Rick' })
  @Expose()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Deckard' })
  @Expose()
  @IsString()
  lastName: string;
}
