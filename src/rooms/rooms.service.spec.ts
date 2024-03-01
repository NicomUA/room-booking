import { RoomsService } from './rooms.service';
import { DbService } from '@app/db';
import { TestBed } from '@automock/jest';

describe('RoomsService', () => {
  let service: RoomsService;
  let dbService: jest.Mocked<DbService>;

  const findManyStub = jest.fn().mockResolvedValue([]);
  const findUniqueStub = jest.fn().mockResolvedValue({
    id: 1,
    name: 'test',
  });
  const createStab = jest.fn();
  const deleteStab = jest.fn();

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(RoomsService).compile();
    service = unit;
    dbService = unitRef.get(DbService);

    dbService.room.findMany = findManyStub;
    dbService.room.findUnique = findUniqueStub;
    dbService.room.create = createStab;
    dbService.room.delete = deleteStab;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    findManyStub.mockResolvedValue([]);
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  describe('findById', () => {
    it('when room not found', async () => {
      findUniqueStub.mockResolvedValue(undefined);
      const response = async () => await service.findById(1);
      expect(response).rejects.toThrowErrorMatchingSnapshot();
    });

    it('when room found', async () => {
      findUniqueStub.mockResolvedValue({
        id: 1,
        name: 'test',
      });
      const result = await service.findById(1);
      expect(result).toEqual({
        id: 1,
        name: 'test',
      });
    });
  });

  it('create', async () => {
    createStab.mockResolvedValue({
      id: 1,
      name: 'test',
    });
    const result = await service.create({
      name: 'test',
    });
    expect(result).toEqual({
      id: 1,
      name: 'test',
    });
  });

  describe('delete', () => {
    it('when room not found', async () => {
      findUniqueStub.mockResolvedValue(undefined);
      const response = async () => await service.delete(1);
      expect(response).rejects.toThrowErrorMatchingSnapshot();
    });

    it('when room found', async () => {
      deleteStab.mockResolvedValue(undefined);
      findUniqueStub.mockResolvedValue({
        id: 1,
        name: 'test',
      });
      const result = await service.delete(1);
      expect(result).toBeUndefined();
    });
  });
});
