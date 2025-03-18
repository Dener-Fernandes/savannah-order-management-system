import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UserDto } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.userService.validateUserPassword(
      username,
      password,
    );
    if (!user || !user.active) null;
    return user;
  }

  public async jwtSign(user: UserDto): Promise<AuthResponseDto> {
    const accessConfig = this.config.access;
    const refreshConfig = this.config.refresh;

    const payload: JwtPayload = { sub: user.id };

    const accessToken = this.jwtService.sign(
      payload,
      accessConfig?.signOptions,
    );

    const refreshToken = this.jwtService.sign(
      payload,
      refreshConfig?.signOptions,
    );

    return new AuthResponseDto(accessToken, refreshToken);
  }
}
