import { Body, Controller, Res } from '@nestjs/common';
import { Response as ExpressRes } from 'express';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  async register(@Body() userDto: CreateUserDto, @Res() res: ExpressRes) {
    console.log('userDto', userDto);
    const newUser = await this.userService.create(userDto);

    const token = await this.authService.login(newUser, res);
    return res
      .status(201)
      .json({ message: 'User created successfully ', token });
  }
}
