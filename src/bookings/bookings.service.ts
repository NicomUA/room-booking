import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private readonly db: DbService) {}

  getBookings() {
    return this.db.booking.findMany();
  }

  getBookingsPerRoom(roomId: number) {
    return this.db.booking.findMany({
      where: {
        roomId,
      },
    });
  }

  async createBooking(
    roomId: number,
    startTime: Date,
    endTime: Date,
  ): Promise<Booking> {
    const isAvailable = await this.checkRoomAvailability(
      roomId,
      startTime,
      endTime,
    );

    if (!isAvailable) {
      throw new Error('Room is not available');
    }

    return this.db.booking.create({
      data: {
        roomId,
        startTime,
        endTime,
      },
    });
  }

  async checkRoomAvailability(
    roomId: number,
    startTime: Date,
    endTime: Date,
  ): Promise<boolean> {
    const existingBooking = await this.db.booking.findFirst({
      where: {
        roomId,
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gte: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lte: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    });
    return !existingBooking;
  }
}
