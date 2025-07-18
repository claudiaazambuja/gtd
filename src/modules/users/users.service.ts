import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,  @Inject(CACHE_MANAGER) private cache: Cache,) {}

  async findByEmail(email: string) {
    let cachedUser = await this.cache.get(`user:${email}`);

    if (cachedUser) {
      return cachedUser; 
    }
    let user = await this.prisma.user.findUnique({ where: { Email: email } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.cache.set(`user:${email}`, user);

    console.log('Dados recuperados do banco de dados');
    return user;
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
    let cachedUsers = await this.cache.get('users:all');
    if (cachedUsers) {
      console.log('Usuários recuperados do cache');
      return cachedUsers; 
    }

    let users = await this.prisma.user.findMany();
    await this.cache.set('users:all', users); 
    console.log('Usuários recuperados do banco de dados');
    return users;
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
    where: { IdUser: id },
  });
  }
}
