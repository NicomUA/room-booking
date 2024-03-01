import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TestBed } from '@automock/jest';
import { userMock } from '../utils/mocks';

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UserController).compile();
    controller = unit;
    userService = unitRef.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
    userService.findAll.mockResolvedValue([userMock]);
    const result = await controller.findAll();
    expect(result).toEqual([userMock]);
  });

  it('findById', async () => {
    userService.findById.mockResolvedValue(userMock);
    const user = await controller.findById(1);
    expect(user).toEqual(userMock);
  });

  it('me', async () => {
    userService.findById.mockResolvedValue(userMock);
    const user = await controller.getMe({ user: { id: 1 } });
    expect(user).toEqual(userMock);
  });
});
