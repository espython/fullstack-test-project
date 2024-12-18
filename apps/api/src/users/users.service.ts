import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { IUser, User } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { LoggerService } from 'src/logger/logger.service';

type ReturnedUser = Omit<IUser, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnedUser> {
    const user = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException('User already exists');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string, message?: string) {
    const user = await this.userModel
      .findOne({
        email,
      })
      .select('password _id name email');

    if (!user) {
      throw new NotFoundException(message ? message : 'User not found');
    }
    return user;
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password');
  }
}
