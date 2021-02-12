import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { JwtAuthGuard } from '../Passport/Guards/jwt-auth.guard';
import { LocalAuthGuard } from '../Passport/Guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/auth/logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.id);
  }
}
