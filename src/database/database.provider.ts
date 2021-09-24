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
        const tenancyTemplateConfig = configService.get('tenancyTemplate');
        const connName = req.headers.client;
        const connectionManager = getConnectionManager();

        if (connectionManager.has(connName)) {
          const connection = connectionManager.get(connName);
          return Promise.resolve(
            connection.isConnected ? connection : connection.connect(),
          );
        }

        return createConnection({
          ...tenancyTemplateConfig,
          database: configService.get('tenancyDbNames')[connName],
          name: connName,
        });
      } catch (error) {
        throw error;
      }
    },
  },
];
