import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  public async create(product: ProductDto): Promise<ProductDto> {
    return plainToInstance(ProductDto, product);
  }
}
