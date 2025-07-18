import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from '@modules/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TasksModule } from './modules/tasks/tasks.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    CacheModule.register({ store: 'memory', ttl: 3600, max: 100 }),
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        watch: true,
      },
      resolvers: [
    { use: QueryResolver,options: ['lang', 'locale'] },
      new HeaderResolver(['x-custom-lang']),
  ],
    }),
   AuthModule,
   HealthModule,
   UsersModule,
   TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
