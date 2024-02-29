import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@app/db';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, RoomsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
