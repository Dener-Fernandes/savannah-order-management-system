import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreateRole } from './decorators/api-create-role.decorator';
import { ApiFindAllRoles } from './decorators/api-find-all-roles.decorator';
import { ApiFindRoleById } from './decorators/api-find-role-by-id.decorator';
import { ApiDeleteRole } from './decorators/api-delete-role.decorator';
import { ApiUpdateRole } from './decorators/api-update-role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { RoleEnum } from './enums/role.enum';

@ApiTags('Role')
@ApiBearerAuth()
@Roles(RoleEnum.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
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
