import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger, Inject } from '@nestjs/common';
// import { InjectKnex, Knex } from 'nestjs-knex';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    Logger.log('get request /login', 'AuthController');

    return this.authService.login(req.user);
  }

  @Get('forgot-password')
  async forgotPassword(@Request() req) {
    Logger.log('get request /forgotPassword', 'AuthController');

    return this.authService.forgotPassword(req.user);
  }

  @Post('forgot-password')
  async restorePassword(@Request() req) {
    Logger.log('post request /forgotPassword', 'AuthController');

    return this.authService.restorePassword(req.user, req.verificationCode, req.newPassword);
  }
}
