import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post(':roomId')
  async createBooking(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    return this.bookingsService.createBooking(roomId, startTime, endTime);
  }

  @Get('/available')
  async checkRoomAvailability(
    @Query('roomId', ParseIntPipe) roomId: number,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    return this.bookingsService.checkRoomAvailability(
      roomId,
      startTime,
      endTime,
    );
  }
}
