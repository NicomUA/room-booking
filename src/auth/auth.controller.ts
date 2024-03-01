import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadResponse } from './dto/payload.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
  ): Promise<JwtPayloadResponse> {
    return this.authService.login({ email, password });
  }
}
