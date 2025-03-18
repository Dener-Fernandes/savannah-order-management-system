import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), AuthModule, RoleModule],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
