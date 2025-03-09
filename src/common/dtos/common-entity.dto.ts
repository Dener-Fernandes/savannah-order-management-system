import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommonEntityDto {
  @ApiProperty({ example: 'ac3a0363-275e-40e6-a3b1-e4783380e89f' })
  @Expose()
  id!: string;

  @ApiProperty({ example: '2025-03-07T04:06:00.558Z' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ example: '2025-03-07T04:06:00.558Z' })
  @Expose()
  updatedAt!: Date;
}
