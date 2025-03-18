import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CryptUtil } from 'src/common/utils/crypt.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(createUserDto);
    const dbUser = await this.userRepository.save(user);

    return plainToInstance(UserDto, dbUser);
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    return plainToInstance(UserDto, users);
  }

  private async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userRoles.role'],
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  public async findOne(id: string): Promise<UserDto> {
    const user = await this.findById(id);

    return plainToInstance(UserDto, user);
  }

  public async update(id: string, updateUser: UpdateUserDto): Promise<UserDto> {
    await this.userRepository.update(id, updateUser);

    const user = this.findById(id);

    return plainToInstance(UserDto, user);
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async validateUserPassword(
    userName: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });

    if (
      user &&
      (await CryptUtil.validatePassword(password, user.password, user.salt))
    ) {
      return plainToInstance(UserDto, user);
    }

    return null;
  }
}
