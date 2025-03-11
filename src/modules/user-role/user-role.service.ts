import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserRoleDto } from './dtos/user-role.dto';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  public async create(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDto> {
    const userRole = this.userRoleRepository.create(createUserRoleDto);
    const dbUserRole = await this.userRoleRepository.save(userRole);

    return plainToInstance(UserRoleDto, dbUserRole);
  }

  public async findAll(): Promise<UserRoleDto[]> {
    const userRoles = await this.userRoleRepository.find();

    return plainToInstance(UserRoleDto, userRoles);
  }

  private async findById(id: string): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOneBy({
      id,
    });

    if (!userRole) throw new NotFoundException();

    return userRole;
  }

  public async findOne(id: string) {
    const userRole = await this.findById(id);

    return plainToInstance(UserRoleDto, userRole);
  }

  public async remove(id: string): Promise<void> {
    const userRole = await this.findById(id);

    await this.userRoleRepository.remove(userRole);
  }
}
