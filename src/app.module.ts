import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import { User } from './components/users/user.entity';
import { UsersController } from './components/users/users.controller';
import { KnexModule } from 'nestjs-knex';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';
import { log } from 'util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    // KnexModule.forRoot({
    //   config: {
    //     client: process.env.DB_CLIENT,
    //     useNullAsDefault: true,
    //     debug: false,
    //     connection: {
    //       host: process.env.DB_HOST,
    //       user: process.env.DB_USERNAME,
    //       password: process.env.DB_PASSWORD,
    //       database: process.env.DB_NAME,
    //       port: parseInt(process.env.DB_PORT) | 1433,
    //       options: {
    //         encrypt: false,
    //       },
    //     },
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     fallbackLanguage: configService.get('fallbackLanguage'),
    //     parserOptions: {
    //       path: path.join(__dirname, '/i18n/'),
    //     },
    //   }),
    //   parser: I18nJsonParser,
    //   inject: [ConfigService],
    // }),
    AuthModule,
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
