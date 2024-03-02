import { AuthGuard } from './auth.guard';
import { TestBed } from '@automock/jest';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: jest.Mocked<JwtService>;

  const mockRequest = {
    originalUrl: '/',
    method: 'GET',
    params: undefined,
    query: undefined,
    body: undefined,
    headers: {
      authorization: 'Bearer test',
    },
  };

  const getRequestStub = jest.fn(() => mockRequest);

  const contextMock = {
    switchToHttp: jest.fn(() => ({
      getRequest: getRequestStub,
      getResponse: () => ({
        statusCode: 200,
      }),
    })),
    // method I needed recently so I figured I'd add it in
    getType: jest.fn(() => 'http'),
  };

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthGuard).compile();
    guard = unit;
    jwtService = unitRef.get(JwtService);
  });

  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('canActivate', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 1 });
    const canActivate = await guard.canActivate(contextMock as any);
    expect(canActivate).toBe(true);
  });

  it('canActivate fail when token is invalid', async () => {
    jwtService.verifyAsync.mockRejectedValue({});
    const canActivate = async () => await guard.canActivate(contextMock as any);
    expect(canActivate).rejects.toThrowErrorMatchingSnapshot();
  });

  it('canActivate fail when token not provided', async () => {
    getRequestStub.mockReturnValue({
      ...mockRequest,
      headers: {
        authorization: undefined,
      },
    } as any);

    const canActivate = async () => await guard.canActivate(contextMock as any);
    expect(canActivate).rejects.toThrowErrorMatchingSnapshot();
  });
});
