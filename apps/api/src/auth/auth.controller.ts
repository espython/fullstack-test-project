import {
  Body,
  Controller,
  Res,
  UseGuards,
  Request,
  Post,
  Response,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { Response as ExpressRes, Request as ExpressReq } from 'express';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { excludeFields } from 'src/utils/excludefields';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Res() res: ExpressRes) {
    const newUserDoc: any = await this.userService.create(userDto);
    const newUser = {
      _id: newUserDoc._doc._id,
      name: newUserDoc._doc.name,
      email: newUserDoc._doc.email,
    };

    const { accessToken, refreshToken } =
      await this.authService.refreshToken(newUser);
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
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res
      .status(201)
      .json({ user: excludeFields(newUser, ['password', '__v']) });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressReq | any, @Response() res: ExpressRes) {
    const { user, body } = req;

    const {
      user: foundUser,
      accessToken,
      refreshToken,
    } = await this.authService.login({ user, body });
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

    return res.status(200).json(foundUser);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res: ExpressRes) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.user,
    );
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
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Request() req: ExpressReq, @Response() res: ExpressRes) {
    const { user } = req.body;
    const foundUser = await this.userService.findById(user._id);
    if (!foundUser) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }
    res.json(foundUser);
  }

  @Post('logout')
  async logOut(@Response() res: ExpressRes) {
    return this.authService.logOut(res);
  }
}
