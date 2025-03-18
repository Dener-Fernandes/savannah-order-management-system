import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthUser } from './decorators/auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@AuthUser() user: UserDto) {
    return this.authService.jwtSign(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  protected(@AuthUser() user: UserDto) {
    return user;
  }
}
