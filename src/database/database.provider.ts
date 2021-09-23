import { createConnection } from 'typeorm';
import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    scope: Scope.REQUEST,
    inject: [REQUEST],
    useFactory: async (req) => {
      try {
        const connName = req.headers.client;
        const client = await createConnection({
          type: 'mssql',
          // host: 'localhost',
          host: 'host.docker.internal',
          port: 1433,
          username: 'SA',
          password: 'p1rrmJim',
          database: 'bselscript',
          synchronize: false,
          entities: ['dist/**/**/*.entity{.ts,.js}'],
          options: {
            encrypt: false,
          },
          name: connName,
        });

        return client;
      } catch (error) {
        throw error;
      }
    },
  },
];
