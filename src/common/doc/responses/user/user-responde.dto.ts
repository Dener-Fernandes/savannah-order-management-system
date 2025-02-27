import { Exclude, Expose } from 'class-transformer';
import { UserCreatableInterface } from 'src/modules/user/interfaces';

@Exclude()
export class UserResponseDto implements UserCreatableInterface {
  @Expose()
  id: string;

  @Expose()
  userName: string;

  @Expose()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
