import { CommonEntityInterface } from 'src/common/interfaces';

export interface UserRoleInterface extends CommonEntityInterface {
  userId: string;
  roleId: string;
}
