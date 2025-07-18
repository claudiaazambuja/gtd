import { Module } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { PrismaModule } from 'prisma/prisma.module'; 
import { UsersController } from './users.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [PrismaModule, CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
