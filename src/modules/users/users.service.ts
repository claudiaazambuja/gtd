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
    if (!id) {
      throw new Error('IdUser is required to update password');
    }
    
    return this.prisma.user.update({
      where: { IdUser: id },
      data: { PasswordHash: password },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
    where: { IdUser: id },
  });
  }
}
