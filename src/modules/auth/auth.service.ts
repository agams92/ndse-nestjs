import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (user && user.password === pass) {
      const cleanUser = JSON.parse(JSON.stringify(user));
      delete cleanUser.password;
      return cleanUser;
    }
    return null;
  }

  public async login({ email, _id, firstName }: any) {
    const payload = { email, _id, firstName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
