import { Controller, Get, Post, Request, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { JwtAuthGuard } from '../Passport/Guards/jwt-auth.guard';
import { LocalAuthGuard } from '../Passport/Guards/local-auth.guard';
import { RegisterDTO } from '../DTO/register.dto';
import { LoginDTO } from '../DTO/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO): Promise<void> {
    await this.authService.register(registerDTO);
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO): Promise<object> {
    return await this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Request() req): Promise<void> {
    await this.authService.logout(req.user.id);
  }
}
