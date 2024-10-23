import { IsString, IsEmail } from 'class-validator';

export class CreatePetDto {
  @IsString()
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;

  constructor(data: CreatePetDto) {
    Object.assign(this, data);
  }
}
