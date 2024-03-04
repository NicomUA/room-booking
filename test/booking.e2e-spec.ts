import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Booking flow (e2e)', () => {
  let app: INestApplication;
  let token;
  let bookingId;

  const bookingMockDAta = {
    roomId: 1,
    startTime: '2022-01-01T00:00:00.000Z',
    endTime: '2022-01-01T01:00:00.000Z',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/login')
      .send({ email: 'HfGpV@example.com', password: 'password' })
      .expect(201);

    token = body.access_token;
  });

  it('should create a booking', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingMockDAta);

    expect(status).toBe(201);
    expect(body).toEqual({
      id: expect.any(Number),
      roomId: 1,
      userId: 1,
      startTime: '2022-01-01T00:00:00.000Z',
      endTime: '2022-01-01T01:00:00.000Z',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    bookingId = body.id;
  });

  it('should return 400 if try to book room at same time', () => {
    return request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingMockDAta)
      .expect(400);
  });

  it('should be able to get booking', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/bookings/`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(body.map((booking) => booking.id)).toContain(bookingId);
  });

  it('should be able to cancel booking', async () => {
    const { status } = await request(app.getHttpServer())
      .delete(`/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });
});
