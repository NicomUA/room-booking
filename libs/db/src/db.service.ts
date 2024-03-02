import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cacheMiddleware } from './db.cache.middleware';

@Injectable()
export class DbService extends PrismaClient {
  constructor() {
    super();
    this.$use(cacheMiddleware);
  }
}
