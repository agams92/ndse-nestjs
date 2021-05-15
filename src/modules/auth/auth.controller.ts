import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { errorHandlerApi } from '../../utils';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/users')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  public async signup(@Body() body) {
    try {
      await this.userService.create(body);
      return 'Registration successfull!';
    } catch (e) {
      errorHandlerApi(e);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  public async signin(@Req() req) {
    try {
      return this.authService.login(req.user);
    } catch (e) {
      errorHandlerApi(e);
    }
  }
}
