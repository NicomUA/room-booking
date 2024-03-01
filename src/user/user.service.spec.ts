import { UserService } from './user.service';
import { DbService } from '@app/db';
import { TestBed } from '@automock/jest';
import { userMock } from '../utils/mocks';

describe('UserService', () => {
  let service: UserService;
  let dbService: jest.Mocked<DbService>;

  const findManyStub = jest.fn().mockResolvedValue([userMock]);
  const findUniqueStub = jest.fn().mockResolvedValue(userMock);

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UserService).compile();
    service = unit;
    dbService = unitRef.get(DbService);

    dbService.user.findMany = findManyStub;
    dbService.user.findUnique = findUniqueStub;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const result = await service.findAll();
    expect(result).toEqual([userMock]);
  });

  it('findById', async () => {
    const user = await service.findById(1);
    expect(user).toEqual(userMock);
  });
});
