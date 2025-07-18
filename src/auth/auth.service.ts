import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly i18n: I18nService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.PasswordHash)){
      let { PasswordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    let payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string) {
    let existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException(this.i18n.t('auth.email_already_registered'))

    let hash = await bcrypt.hash(password, 10);
    return this.usersService.createUser(email, hash);
  }

  async changePassword(userId: number, newPassword: string) {
    let hash = await bcrypt.hash(newPassword, 10);
    return this.usersService.updatePassword(userId, hash);
  }
}