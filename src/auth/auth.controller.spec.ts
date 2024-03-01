import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TestBed } from '@automock/jest';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(AuthController).compile();
    controller = unit;
    authService = unitRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login', async () => {
      authService.login.mockResolvedValue({ access_token: 'test' });

      await expect(
        await controller.login({ email: 'test', password: 'test' }),
      ).toEqual({
        access_token: 'test',
      });
    });

    it('should throw an error', async () => {
      authService.login.mockImplementation(() => {
        throw new Error();
      });

      await expect(
        controller.login({ email: 'test', password: 'test' }),
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
