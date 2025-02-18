import { CommonEntityInterface } from '../interfaces';

export class CommonEntity implements CommonEntityInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
