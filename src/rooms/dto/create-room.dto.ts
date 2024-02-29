import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly capacity: number;
}
