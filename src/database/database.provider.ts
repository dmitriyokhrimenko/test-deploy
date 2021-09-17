import { createConnection } from 'typeorm';
import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

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
          host: 'localhost',
          port: 1344,
          username: 'SA',
          password: 'p1rrmJim',
          database: 'elal',
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
