import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
