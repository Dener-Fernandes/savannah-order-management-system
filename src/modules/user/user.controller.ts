import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/common/doc/responses/user/user.response';
import { ApiCreateUser } from './decorators/ApiCreateUser';
import { ApiFindUserById } from './decorators/ApiFindUserById';
import { ApiFindAllUsers } from './decorators/ApiFindAllUsers';
import { ApiUpdateUser } from './decorators/ApiUpdateUser';
import { ApiDeleteUser } from './decorators/ApiDeleteUser';

@ApiTags('User')
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
