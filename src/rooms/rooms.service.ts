// room.service.ts
import { Injectable } from '@nestjs/common';
import { Room, Prisma } from '@prisma/client';
import { DbService } from '@app/db';

@Injectable()
export class RoomsService {
  constructor(private db: DbService) {}

  async findAll(): Promise<Room[]> {
    return this.db.room.findMany();
  }

  async findById(id: number): Promise<Room> {
    return this.db.room.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    return this.db.room.create({ data });
  }

  async update(id: number, data: Prisma.RoomUpdateInput): Promise<Room> {
    return this.db.room.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.db.room.delete({
      where: { id },
    });
  }
}
