import { Controller, Post, Body, UseGuards, Request, Patch, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { I18nService } from 'nestjs-i18n';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,  private readonly i18n: I18nService) {}
  
  @Post('login')
    async login(@Body() body: { email: string; password: string }) {
      let user = await this.authService.validateUser(body.email, body.password);
      if (!user) {
        throw new UnauthorizedException({
          message: await (this.i18n.t('auth.invalid_credentials') as Promise<string>),
        });

      }
      return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password') 
    async changePassword(@Request() req, @Body() body: ChangePasswordDto  ) {
    if (!req.user.userId) throw new Error('IdUser is required to update password');
    return this.authService.changePassword(req.user.userId, body.newPassword);
  }
}