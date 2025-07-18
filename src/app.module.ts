import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { I18nJsonLoader } from '@nestjs-i18n/json-loader';
import * as path from 'path';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        watch: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
