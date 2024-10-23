import {
  Body,
  Controller,
  Res,
  UseGuards,
  Request,
  Post,
  Response,
} from '@nestjs/common';
import { Response as ExpressRes, Request as ExpressReq } from 'express';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { excludeFields } from 'src/utils/excludefields';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Res() res: ExpressRes) {
    const newUser = await this.userService.create(userDto);
    const modUser = excludeFields(newUser, ['password', '__v']);
    return this.authService.login(modUser, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressReq | any, @Response() res: ExpressRes) {
    const { body } = req;
    return await this.authService.login(body, res);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
