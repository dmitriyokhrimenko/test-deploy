import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable({ scope: Scope.REQUEST })
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

  /**
   * Send verification code to the user
   * Returns verification code.
   *
   *
   * @param user - user object retrieved from DB storage
   * @returns
   * accessToken - verification code
   */
  async forgotPassword(user: any) {
    //TODO: sending verification code to user

    //TODO: move to helper
    const max = 1000000;
    const min = 100000;
    const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;

    return {
      verificationCode
    };
  }

  /**
   * Send verification code to the user
   * Returns verification code.
   *
   *
   * @param user - user object retrieved from DB storage
   * @returns
   * accessToken - verification code
   */
   async restorePassword(user: any, verificationCode: number, newPassword: string) {
    
    if(verificationCode) {
      const updateResult = await this.usersService.update(user.id, { password: newPassword });
    }
    
    return {
      success: true
    };
  }
}
