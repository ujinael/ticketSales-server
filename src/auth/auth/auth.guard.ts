import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class AuthGuard extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  async validate(login: string, password: string): Promise<any> {
    console.log(login);
    const user = await this.usersService.checkAuthUser(login, password);
    console.log('Validate AuthGuard', user);
    if (!user) {
      throw new HttpException(
        {
          error: HttpStatus.UNAUTHORIZED,
          message: 'User not found',
        },
        HttpStatus.CONFLICT,
      );
    }
    return true;
    // return user;
  }
}
