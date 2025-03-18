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
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { UserRoleService } from './user-role.service';
import { ApiCreateUserRole } from './decorators/ApiCreateUserRole';
import { ApiFindAllUserRoles } from './decorators/ApiFindAllUserRoles';
import { ApiFindUserRoleById } from './decorators/ApiFindUserRoleById';
import { ApiDeleteUserRole } from './decorators/ApiDeleteUserRole';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Roles } from '../role/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';

@ApiTags('User-role')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.Admin)
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
