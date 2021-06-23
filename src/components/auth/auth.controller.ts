import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger, Inject } from '@nestjs/common';
// import { InjectKnex, Knex } from 'nestjs-knex';

@Controller('auth')
export class AuthController {
  // constructor(@InjectKnex() private readonly knex: Knex) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    Logger.debug('get request /login');
    return req.user;
  }
}
