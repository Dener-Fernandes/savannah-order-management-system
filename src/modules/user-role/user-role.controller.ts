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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { UserRoleService } from './user-role.service';
import { ApiCreateUserRole } from './decorators/api-create-user-role.decorator';
import { ApiFindAllUserRoles } from './decorators/api-find-all-user-roles.decorator';
import { ApiFindUserRoleById } from './decorators/api-find-user-role-by-id.decorator';
import { ApiDeleteUserRole } from './decorators/api-delete-user-role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Roles } from '../role/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';

@ApiTags('User-role')
@ApiBearerAuth()
@Roles(RoleEnum.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiCreateUserRole()
  @Post()
  async create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  @ApiFindAllUserRoles()
  async findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  @ApiFindUserRoleById()
  async findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(id);
  }

  @Delete(':id')
  @ApiDeleteUserRole()
  async remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
