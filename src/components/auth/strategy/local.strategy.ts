import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    // super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<any> {
    Logger.debug(
      `Login credentials: ${JSON.stringify({ username, password })}`,
      'LocalStrategy',
    );

    const user = await this.authService.validateUser(username, password);

    Logger.debug(`Retrieved user: ${JSON.stringify(user)}`, 'LocalStrategy');

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
