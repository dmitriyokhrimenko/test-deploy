import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import configuration from '../config/configuration';
import { KnexModule } from 'nestjs-knex';

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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
