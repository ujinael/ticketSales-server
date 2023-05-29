import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTToken } from 'src/auth/entities/jwt_token.entity';
import { PasswordChangeDto } from './dto/password_change.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const pretenderUser = await this.checkRegUser(createUserDto.login);
      if (pretenderUser)
        throw Error(`User is with login ${pretenderUser.login} is exist`);
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        ...createUserDto,
        passwordHash,
      });
      return createdUser.save();
    } catch (error) {
      throw new HttpException(
        {
          errorText: error.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  async changePassword(passwordChangeDto: PasswordChangeDto) {
    try {
      console.log(passwordChangeDto);

      const pretenderUser = await this.findOne(passwordChangeDto.userId);
      if (!pretenderUser) throw Error(`User not found`);
      const compareResult = await bcrypt.compare(
        passwordChangeDto.oldPassword,
        pretenderUser.passwordHash,
      );
      if (!compareResult) throw Error(`Wrong old password`);
      pretenderUser.passwordHash = await bcrypt.hash(
        passwordChangeDto.newPassword,
        10,
      );
      console.log(pretenderUser);

      return await this.userModel.findByIdAndUpdate(
        { _id: passwordChangeDto.userId },
        pretenderUser,
      );
    } catch (error) {
      throw new HttpException(
        {
          errorText: error.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return await user;
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findOneAndRemove({ _id: id });
  }
  async checkAuthUser(login: string, password: string): Promise<User> {
    try {
      const pretenderUser = await this.userModel.findOne({ login });
      const compareResult = await bcrypt.compare(
        password,
        pretenderUser.passwordHash,
      );
      if (!compareResult) throw Error('User not authenticated');
      return pretenderUser;
    } catch (error) {
      throw new HttpException(
        {
          errorText: error.message,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
  async loginBasic(login: string, password: string): Promise<JWTToken> {
    try {
      const pretenderUser = await this.userModel.findOne({ login });
      if (!pretenderUser) throw Error('User not found');
      const compareResult = await bcrypt.compare(
        password,
        pretenderUser.passwordHash,
      );
      if (!compareResult) throw Error('Wrong password');

      const jwt = this.jwtService.sign(pretenderUser.toJSON(), {
        algorithm: 'HS256',
        expiresIn: 60000,
      });
      pretenderUser.passwordHash = undefined;
      return {
        id: pretenderUser._id.toString(),
        access_token: jwt,
        currentUser: pretenderUser,
        login: pretenderUser.login,
        sub: pretenderUser._id.toString(),
      };
    } catch (error) {
      throw new HttpException(
        {
          errorText: error.message,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
  async checkRegUser(login: string): Promise<User> {
    return this.userModel.findOne({ login: login });
  }

  async removeUsers() {
    return this.userModel.findById('').exec();
  }
}
