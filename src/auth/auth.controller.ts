import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginInterface, LoginResponseInterface } from '../utils/interfaces';
import { AuthService } from './auth.service';
import { LoginDto } from './data/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginPayload: LoginDto): Promise<LoginResponseInterface> {
    return this._authService.login(loginPayload);
  }
}
