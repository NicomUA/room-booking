import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [RoomsModule],
})
export class BookingsModule {}
