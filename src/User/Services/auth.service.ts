import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<any | null> {
    const user = await this.usersService.getOneByEmail(email);

    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, id: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any): Promise<any> {
    const user = await this.usersService.create(userData);
  }
}
