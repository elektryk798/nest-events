import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {UserEntity} from "../user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.usersService.getOneByEmail(email);

    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(userData: Partial<UserEntity>): Promise<object> {
    const user = await this.usersService.getOneByEmail(userData.email);

    const payload = { email: user.email, id: user.id };

    const token = this.jwtService.sign(payload);

    await this.usersService.saveToken(user.id, token);

    return {
      access_token: token,
    };
  }

  async register(userData: Partial<UserEntity>): Promise<void> {
    await this.usersService.create(userData);
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.saveToken(userId, null);
  }
}
