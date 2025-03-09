import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role.dto';
import { plainToInstance } from 'class-transformer';
import { RoleDto } from './dtos/role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const role = this.roleRepository.create(createRoleDto);

    const dbRole = await this.roleRepository.save(role);

    return plainToInstance(RoleDto, dbRole);
  }

  public async findAll(): Promise<RoleDto[]> {
    const roles = await this.roleRepository.find();

    return plainToInstance(RoleDto, roles);
  }

  private async findById(id: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) throw new NotFoundException();

    return role;
  }

  public async findOne(id: string): Promise<RoleDto> {
    const role = await this.roleRepository.findOneBy({
      id,
    });

    return plainToInstance(RoleDto, role);
  }

  public async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findById(id);

    const newRole: Role = {
      ...role,
      ...updateRoleDto,
    };

    await this.roleRepository.save(newRole);

    return plainToInstance(RoleDto, newRole);
  }

  public async remove(id: string): Promise<void> {
    const role = await this.findById(id);

    await this.roleRepository.remove(role);
  }
}
