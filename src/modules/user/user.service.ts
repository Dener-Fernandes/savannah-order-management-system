import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/common/doc/responses/user/user-responde.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    const dbUser = await this.userRepository.save(user);

    return plainToInstance(UserResponseDto, dbUser);
  }

  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    return plainToInstance(UserResponseDto, users);
  }
}
