import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const compareHashedResult = await compare(password, user.password);
    if (!compareHashedResult) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashed, ...result } = user;
    return result;
  }

  async login(user: LoginUserDto | any, res: Response | any) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };

    return res.status(200).json({
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '2h',
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(
          new Date().getTime() + parseInt(process.env.TOKEN_EXPIRE_TIME),
        ),
      },
    });
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.JWT_SECRET_KET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
      expiresIn: new Date().setTime(
        new Date().getTime() + parseInt(process.env.TOKEN_EXPIRE_TIME),
      ),
    };
  }
}
