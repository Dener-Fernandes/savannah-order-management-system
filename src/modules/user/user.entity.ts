import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { UserInterface } from './interfaces';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Role } from '../role/role.entity';

@Entity()
@Unique(['userName'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'citext', nullable: false })
  userName: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true, default: null })
  salt: string;

  @Column({ type: 'citext', nullable: true })
  firstName: string;

  @Column({ type: 'citext', nullable: true })
  lastName: string;

  @Column({ type: 'citext' })
  email: string;

  @Column({ default: true, nullable: false })
  active!: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
