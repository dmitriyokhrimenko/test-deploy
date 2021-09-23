import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Logger } from '@nestjs/common';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
    // super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    Logger.debug(
      `Login credentials: ${JSON.stringify({ username, password })}`,
      'LocalStrategy',
    );

    const contextId = ContextIdFactory.getByRequest(request);

    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const user = await authService.validateUser(username, password);

    Logger.debug(`Retrieved user: ${JSON.stringify(user)}`, 'LocalStrategy');

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
