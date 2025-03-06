import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, Unique } from 'typeorm';
import { RoleInterface } from './interfaces/role.interface';

@Entity()
@Unique(['name'])
export class Role extends CommonEntity implements RoleInterface {
  @Column()
  name: string;

  // @OneToMany(() => UserRole, (userRole) => userRole.role)
  // userRoles!: UserRole[];
}
