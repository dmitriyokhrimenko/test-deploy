import { createConnection, getConnectionManager } from 'typeorm';
import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    scope: Scope.REQUEST,
    inject: [REQUEST, ConfigService],
    useFactory: async (req, configService: ConfigService) => {
      try {
        const clientName = req.headers.client;
        const connectionManager = getConnectionManager();

        if (connectionManager.has(clientName)) {
          const connection = connectionManager.get(clientName);
          return Promise.resolve(
            connection.isConnected ? connection : connection.connect(),
          );
        }

        return createConnection({
          url: configService.get('tenancyDbConnections')[clientName],
          type: 'mssql',
          synchronize: false,
          entities: ['dist/**/**/*.entity{.ts,.js}'],
          options: {
            encrypt: false,
          },
          name: clientName,
        });
      } catch (error) {
        throw error;
      }
    },
  },
];
