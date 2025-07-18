import { Controller, Post, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Patch('change-password')
  async changePassword(
    @Request() req,
    @Body() body: { newPassword: string },
  ) {
    return this.authService.changePassword(req.user.userId, body.newPassword);
  }
}