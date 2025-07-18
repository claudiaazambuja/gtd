import { Controller, Post, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password') 
    async changePassword(@Request() req, @Body() body: ChangePasswordDto  ) {
    return this.authService.changePassword(req.user.userId, body.newPassword);
  }
}