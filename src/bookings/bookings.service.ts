import { DbService } from '@app/db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Booking } from '@prisma/client';
import { RoomsService } from '../rooms/rooms.service';
import { UserService } from '../user/user.service';
import { MailerService } from '@app/mailer';

@Injectable()
export class BookingsService {
  constructor(
    private readonly db: DbService,
    private readonly roomsService: RoomsService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  getBookings() {
    return this.db.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async createBooking(
    roomId: number,
    startTime: Date,
    endTime: Date,
    userId: number,
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

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //create booking
    const booking = await this.db.booking.create({
      data: {
        userId: user.id,
        roomId,
        startTime,
        endTime,
      },
    });

    // send booking confirmation email
    this.mailerService.sendBookingConfirmation(user, booking);

    return booking;
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
