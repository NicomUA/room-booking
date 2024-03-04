import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Login flow (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should login user with correct credentials', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/login')
      .send({ email: 'HfGpV@example.com', password: 'password' });

    expect(status).toBe(201);
    expect(body).toEqual({
      access_token: expect.any(String),
    });
  });

  it('Should not login user with wrong credentials', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ email: 'HfGpV@example.com', password: 'wrong' })
      .expect(400);
  });
});
