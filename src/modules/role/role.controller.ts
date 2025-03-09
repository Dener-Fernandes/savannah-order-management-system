import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateRole } from './decorators/ApiCreateRole';
import { ApiFindAllRoles } from './decorators/ApiFindAllRoles';
import { ApiFindRoleById } from './decorators/ApiFindRoleById';
import { ApiDeleteRole } from './decorators/ApiDeleteRole';
import { ApiUpdateRole } from './decorators/ApiUpdateRole';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiCreateRole()
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @ApiFindAllRoles()
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @ApiFindRoleById()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }

  @ApiUpdateRole()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRole: UpdateRoleDto) {
    return await this.roleService.update(id, updateRole);
  }

  @ApiDeleteRole()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(id);
  }
}
