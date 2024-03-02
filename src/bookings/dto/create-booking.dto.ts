import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  roomId: number;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  @IsDateString({ strict: true })
  startTime: Date;

  @ApiProperty({ example: '2022-01-01T10:00:00.000Z' })
  @IsDateString({ strict: true })
  endTime: Date;
}
