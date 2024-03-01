import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [RoomsModule, UserModule],
})
export class BookingsModule {}
