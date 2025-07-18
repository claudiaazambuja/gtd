import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()], 
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService], 
})
export class TasksModule {}
