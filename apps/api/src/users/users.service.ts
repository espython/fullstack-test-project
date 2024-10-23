import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, User } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }
}
