import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { Email : email } });
  }

   async createUser(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        Email: email,
        PasswordHash: password,
        Username: email.split('@')[0], 
      },
    });
  }

  async updatePassword(id: number, password: string) {
    return this.prisma.user.update({
      where: { IdUser: id },
      data: { PasswordHash: password },
    });
  }
}
