import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export class JWTToken {
  id: string;
  sub: string;
  access_token: string;
  currentUser: UpdateUserDto;
  login: string;
}
