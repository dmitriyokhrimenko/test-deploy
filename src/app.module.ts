import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import configuration from '../config/configuration';
import { KnexModule } from 'nestjs-knex';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './components/users/user.entity';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { UsersController } from './components/users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    KnexModule.forRoot({
      config: {
        client: process.env.DB_CLIENT,
        useNullAsDefault: true,
        debug: false,
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: parseInt(process.env.DB_PORT) | 1433,
          options: {
            encrypt: false,
          },
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) | 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [User],
      options: {
        encrypt: false,
      },
    }),
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
