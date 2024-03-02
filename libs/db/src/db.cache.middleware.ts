import { Prisma } from '@prisma/client';
import { createPrismaRedisCache } from 'prisma-redis-middleware';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

export const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  models: [
    { model: 'Booking', excludeMethods: ['findFirst'] },
    { model: 'User', excludeMethods: ['findMany'] },
    { model: 'Room', excludeMethods: ['findMany'] },
  ],
  storage: {
    type: 'redis',
    options: {
      client: redis,
      invalidation: { referencesTTL: 300 },
    },
  },
  cacheTime: 300,
});
