import { Injectable, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../Repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly users: UserRepository,
  ) {}

  async getOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.users.findOne({ email: email });
  }

  async create(userData: Partial<UserEntity>): Promise<any> {
    if (await this.getOneByEmail(userData.email)) {
      throw new BadRequestException();
    }

    userData.password = await argon2.hash(userData.password);

    const user = this.users.create(userData);

    await this.users.save(user);

    const { password, ...created } = user;

    return created;
  }
}
