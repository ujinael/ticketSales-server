import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appConfig } from '../../config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });

    // console.log('Constructor JwtStrategy');
  }

  async validate(payload: any) {
    // console.log('Validate JwtStrategy', {
    //   userId: payload._id,
    //   login: payload.login,
    // });
    return { userId: payload._id, login: payload.login };
  }
}
