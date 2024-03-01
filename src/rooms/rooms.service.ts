// room.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Room, Prisma } from '@prisma/client';
import { DbService } from '@app/db';

@Injectable()
export class RoomsService {
  constructor(private db: DbService) {}

  async findAll(): Promise<Room[]> {
    return this.db.room.findMany();
  }

  async findById(id: number): Promise<Room> {
    const room = await this.db.room.findUnique({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    return this.db.room.create({ data });
  }

  async delete(id: number): Promise<void> {
    const room = await this.db.room.findUnique({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.db.room.delete({
      where: { id },
    });
  }
}
