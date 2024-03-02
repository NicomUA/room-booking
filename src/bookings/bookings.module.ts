import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { UserModule } from '../user/user.module';
import { MailerModule } from '@app/mailer';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [RoomsModule, UserModule, MailerModule],
})
export class BookingsModule {}
