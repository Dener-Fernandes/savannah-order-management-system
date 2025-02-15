import { IsDate, IsNumber, IsString } from 'class-validator';
import { ProductInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductDto implements ProductInterface {
  @Expose()
  id?: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description?: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsNumber()
  stock: number;

  @Expose()
  @IsString()
  imageURL?: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;
}
