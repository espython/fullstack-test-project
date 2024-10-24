import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/user.dto';
import { excludeFields } from 'src/utils/excludefields';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = (await this.userService.findByEmail(email)) as any;
    if (!user) throw new UnauthorizedException();
    const compareHashedResult = await compare(password, user.password);
    if (!compareHashedResult) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashed, ...result } = user._doc;
    return result;
  }

  async login(userDto: LoginUserDto | any, res: Response | any) {
    const payload = {
      email: userDto.user.email,
      sub: {
        name: userDto.user.name,
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

    const userWithoutPassword = excludeFields(userDto.user, ['password']);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({
      _id: userWithoutPassword._id,
      name: userWithoutPassword.name,
      email: userWithoutPassword.email,
    });
    // return res.status(200).json({
    //   user: { email: userWithoutPassword.username },
    //   backendTokens: {
    //     accessToken,
    //     refreshToken,
    //     expiresIn: new Date().setTime(
    //       new Date().getTime() + parseInt(process.env.TOKEN_EXPIRE_TIME),
    //     ),
    //   },
    // });
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
}
