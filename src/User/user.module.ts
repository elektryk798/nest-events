import { Module } from '@nestjs/common';
import { UserService } from './Services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './Repositories/user.repository';
import { AuthController } from './Controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './Services/auth.service';
import { LocalStrategy } from './Passport/Strategies/local.strategy';
import { JwtStrategy } from './Passport/Strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '900s' },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [UserService, AuthService],
})
export class UserModule {}
