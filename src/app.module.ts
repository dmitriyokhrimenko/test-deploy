import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import { UsersController } from './components/users/users.controller';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
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
