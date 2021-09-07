import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(email);
    if (user && user.pass === pass) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login by a username and password.
   * Returns the accessToken and refreshToken.
   *
   *
   * @param user - user object retrieved from DB storage
   * @returns
   * accessToken - access token
   * refreshToken - refresh token
   */
  async login(user: any) {
    const payload = { username: user.username, userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
