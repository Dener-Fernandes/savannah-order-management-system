import { Column, Entity, Unique } from 'typeorm';
import { UserInterface } from '../interfaces';
import { CommonEntity } from 'src/common/entities/common.entity';

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
}
