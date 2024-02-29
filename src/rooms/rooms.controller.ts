import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
    return this.roomsService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id, ParseIntPipe') id: number,
    @Body() data: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roomsService.delete(id);
  }
}
