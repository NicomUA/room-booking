import { Prisma } from '@prisma/client';
import { createPrismaRedisCache } from 'prisma-redis-middleware';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

export const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  excludeMethods: ['findFirst', 'count'],
  storage: {
    type: 'redis',
    options: {
      client: redis,
      invalidation: { referencesTTL: 300 },
    },
  },
  cacheTime: 300,
});
