import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { UserRoleService } from './user-role.service';
import { ApiCreateUserRole } from './decorators/ApiCreateUserRole';
import { ApiFindAllUserRoles } from './decorators/ApiFindAllUserRoles';
import { ApiFindUserRoleById } from './decorators/ApiFindUserRoleById';
import { ApiDeleteUserRole } from './decorators/ApiDeleteUserRole';

@ApiTags('User-role')
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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserRoleDto: UpdateUserRoleDto,
  // ) {
  //   return this.userRoleService.update(+id, updateUserRoleDto);
  // }

  @Delete(':id')
  @ApiDeleteUserRole()
  async remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
