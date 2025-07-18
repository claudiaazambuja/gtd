import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UsersService } from '@modules/users/users.service';
import { User } from '@src/modules/users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly i18n: I18nService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user: User = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.PasswordHash)){
      let { PasswordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    let payload = { username: user.Username, sub: user.IdUser, email: user.Email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, i18n: I18nContext) {
    console.log("Lang", i18n.lang);
    let existing = await this.usersService.findByEmail(email);

    if (existing) {
    const msg = await i18n.t('auth.email_already_registered');
    console.log('TRADUÇÃO:', msg);
    throw new BadRequestException(msg);
  }

    let hash = await bcrypt.hash(password, 10);
    return this.usersService.createUser(email, hash);
  }

 async changePassword(id: number, password: string) {
    if (!id) throw new Error('IdUser is required to update password');

    return this.usersService.updatePassword(id, await bcrypt.hash(password, 10));
  }
}