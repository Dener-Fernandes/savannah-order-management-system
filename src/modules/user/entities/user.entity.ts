import { UserInterface } from '../interfaces';

export class UserEntity implements UserInterface {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  salt: string;
  active: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
