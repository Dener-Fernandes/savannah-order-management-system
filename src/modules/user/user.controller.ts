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
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateUser } from './decorators/ApiCreateUser';
import { ApiFindUserById } from './decorators/ApiFindUserById';
import { ApiFindAllUsers } from './decorators/ApiFindAllUsers';
import { ApiUpdateUser } from './decorators/ApiUpdateUser';
import { ApiDeleteUser } from './decorators/ApiDeleteUser';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Roles } from '../role/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.Admin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreateUser()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiFindAllUsers()
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiFindUserById()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiUpdateUser()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }

  @ApiDeleteUser()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
