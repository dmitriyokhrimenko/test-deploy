import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.debug(req.url, 'Request url');
    Logger.verbose(`${JSON.stringify(req.headers)}`, 'LoggerMiddleware');
    next();
  }
}
