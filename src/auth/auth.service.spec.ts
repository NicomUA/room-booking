import { AuthService } from './auth.service';
import { TestBed } from '@automock/jest';
import { UserService } from '../user/user.service';
import { userMock } from '../utils/mocks';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();
    service = unit;
    userService = unitRef.get(UserService);
    jwtService = unitRef.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login', async () => {
      userService.findByEmail.mockResolvedValue({
        ...userMock,
        password: 'test',
      });
      jwtService.signAsync.mockResolvedValue('test');
      const result = await service.login({ email: 'test', password: 'test' });
      expect(result).toEqual({ access_token: 'test' });
    });

    it('should throw an error if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);
      await expect(
        service.login({ email: 'test', password: 'test' }),
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should throw an error if password is wrong', async () => {
      userService.findByEmail.mockResolvedValue({
        ...userMock,
        password: 'test',
      });
      await expect(
        service.login({ email: 'test', password: 'wrong' }),
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
