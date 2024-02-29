import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly capacity?: number;
}
