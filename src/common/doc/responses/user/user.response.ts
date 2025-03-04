import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'bcb34216-1ccd-4a10-a97b-637f303e2763' })
  id: string;

  @ApiProperty({ example: 'RickDeckard@gmail.com' })
  email: string;

  @ApiProperty({ example: 'rick-deckard' })
  userName: string;

  @ApiProperty({ example: 'Rick' })
  firstName: string;

  @ApiProperty({ example: 'Deckard' })
  lastName: string;

  @ApiProperty({ example: 'true' })
  active: boolean;
}
