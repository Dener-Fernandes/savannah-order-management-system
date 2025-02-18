import { CommonEntityInterface } from 'src/modules/common/interfaces';

export interface UserInterface extends CommonEntityInterface {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  salt: string;
  active: boolean;
}
