import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  roomId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
