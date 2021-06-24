import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger, Inject } from '@nestjs/common';
// import { InjectKnex, Knex } from 'nestjs-knex';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  // constructor(@InjectKnex() private readonly knex: Knex) {}
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    Logger.log('get request /login', 'AuthController');

    return this.authService.login(req.user);
  }
}
