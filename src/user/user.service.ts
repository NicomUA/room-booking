import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  findAll() {
    return this.db.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  findById(id: number) {
    return this.db.user.findUnique({
      select: { id: true, name: true, email: true },
      where: { id },
    });
  }
}
