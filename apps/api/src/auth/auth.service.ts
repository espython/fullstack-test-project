import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/user.dto';
import { excludeFields } from 'src/utils/excludefields';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(
      email,
      `email or password is incorrect`,
    );
    if (!user) throw new UnauthorizedException();
    const compareHashedResult = await compare(password, user.password);
    if (!compareHashedResult) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashed, ...result } = user;
    return result;
  }

  async login(userDto: LoginUserDto | any) {
    console.log({ userDto });
    const payload = {
      email: userDto.user._doc.email,
      sub: {
        name: userDto.user._doc.name,
      },
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '2h',
        secret: process.env.JWT_SECRET_KEY,
      }),
      await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
    ]);

    const userWithoutPassword = excludeFields(userDto.user._doc, ['password']);
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.JWT_SECRET_KEY,
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

  async logOut(res: Response) {
    res.cookie('accessToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  }
}
