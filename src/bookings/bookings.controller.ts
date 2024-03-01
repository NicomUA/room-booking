import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ParseDatePipe } from '../utils/parseDatePipe';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('booking')
@Controller('bookings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async findAll(): Promise<Booking[]> {
    return this.bookingsService.getBookings();
  }

  /**
   * Creates a booking with the specified room, start time, and end time.
   *
   * @param {CreateBookingDto} roomId - the ID of the room for the booking
   * @param {CreateBookingDto} startTime - the start time of the booking
   * @param {CreateBookingDto} endTime - the end time of the booking
   * @return {Promise<Booking>} the newly created booking
   */
  @Post()
  async createBooking(
    @Body() { roomId, startTime, endTime }: CreateBookingDto,
    @Request() req,
  ): Promise<Booking> {
    const { user } = req;
    return this.bookingsService.createBooking(
      roomId,
      startTime,
      endTime,
      user.id,
    );
  }

  /**
   * Asynchronous function to check the availability of a room.
   *
   * @param {number} roomId - the ID of the room to check availability for
   * @param {Date} startTime - the start time for checking availability
   * @param {Date} endTime - the end time for checking availability
   * @return {Promise<boolean>} a promise that resolves to a boolean indicating the availability status
   */
  @Get('/available')
  async checkRoomAvailability(
    @Query('roomId', ParseIntPipe) roomId: number,
    @Query('startTime', ParseDatePipe) startTime: Date,
    @Query('endTime', ParseDatePipe) endTime: Date,
  ) {
    return this.bookingsService.checkRoomAvailability(
      roomId,
      startTime,
      endTime,
    );
  }

  /**
   * Delete a booking by ID.
   *
   * @param {number} id - The ID of the booking to be deleted
   * @return {Promise<void>} A promise that resolves when the booking is deleted
   */
  @Delete(':id')
  async deleteBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.deleteBooking(id);
  }
}
