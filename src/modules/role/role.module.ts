import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService, RolesGuard],
  exports: [RolesGuard],
})
export class RoleModule {}
