import { DbService } from '@app/db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Booking } from '@prisma/client';
import { RoomsService } from 'src/rooms/rooms.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly db: DbService,
    private readonly roomsService: RoomsService,
  ) {}

  getBookings() {
    return this.db.booking.findMany();
  }

  async getBookingsPerRoom(roomId: number) {
    const room = await this.roomsService.findById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

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
    // check if room is available in that time period
    const isAvailable = await this.checkRoomAvailability(
      roomId,
      startTime,
      endTime,
    );

    if (!isAvailable) {
      throw new BadRequestException('Room is not available');
    }

    //create booking
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
    const room = await this.roomsService.findById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // check if room is available in that time period with overlapping bookings
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

  async deleteBooking(id: number) {
    const booking = await this.db.booking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return this.db.booking.delete({
      where: {
        id,
      },
    });
  }
}
