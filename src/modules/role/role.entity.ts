import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { RoleInterface } from './interfaces/role.interface';
import { UserRole } from '../user-role/user-role.entity';
import { User } from '../user/user.entity';

@Entity()
@Unique(['name'])
export class Role extends CommonEntity implements RoleInterface {
  @Column()
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
