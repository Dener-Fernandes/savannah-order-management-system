import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { LocalStrategy } from './local-strategy';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => config,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
