import { RoomsController } from './rooms.controller';
import { TestBed } from '@automock/jest';
import { RoomsService } from './rooms.service';
import { roomMock } from '../utils/mocks';

describe('RoomsController', () => {
  let controller: RoomsController;
  let roomsService: jest.Mocked<RoomsService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(RoomsController).compile();
    controller = unit;
    roomsService = unitRef.get(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
    roomsService.findAll.mockResolvedValue([]);

    const result = await controller.findAll();
    expect(result).toEqual([]);
  });

  it('findById', async () => {
    roomsService.findById.mockResolvedValue(roomMock);
    const result = await controller.findById(1);
    expect(result).toEqual(roomMock);
  });

  it('create', async () => {
    roomsService.create.mockResolvedValue(roomMock);

    const result = await controller.create({
      name: 'test',
    });

    expect(result).toEqual(roomMock);
  });

  it('delete', async () => {
    const result = await controller.delete(1);
    expect(result).toBeUndefined();
  });
});
