import { ProductInterface } from '../interfaces';

export class Product implements ProductInterface {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageURL?: string;
  createdAt: Date;
  updatedAt: Date;
}
