import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JWTToken } from 'src/auth/entities/jwt_token.entity';
import { PasswordChangeDto } from './dto/password_change.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JWTToken> {
    return this.usersService.loginBasic(loginDto.login, loginDto.password);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(await this.usersService.findOne(id));

    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Put('change_password/:id')
  changePassword(@Body() passwordChangeDto: PasswordChangeDto) {
    return this.usersService.changePassword(passwordChangeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
