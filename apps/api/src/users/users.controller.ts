import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  Request,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Response as ExpressRes, Request as ExpressReq } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { message: 'User registered successfully', user };
  }
  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@Request() req: ExpressReq | any, @Response() res: ExpressRes) {
    const { user } = req;
    console.log(user);

    const foundUser = await this.userService.findByEmail(user.email);

    res.json(foundUser);
  }
}
