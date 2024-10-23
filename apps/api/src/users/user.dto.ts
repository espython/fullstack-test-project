import { IsString, IsEmail } from 'class-validator';
import { IsPasswordValid } from './password-validator.decorator';

export class CreateUserDto {
  @IsString()
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  @IsPasswordValid({ message: 'Password is too weak' })
  public password!: string;

  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }
}

export class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
}
