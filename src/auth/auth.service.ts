import { DbService } from '@app/db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadResponse } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<JwtPayloadResponse> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new BadRequestException('Wrong password');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
