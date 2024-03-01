import { DbService } from '@app/db';
import { bookingMock, roomMock, userMock } from '../utils/mocks';
import { BookingsService } from './bookings.service';
import { TestBed } from '@automock/jest';
import { RoomsService } from '../rooms/rooms.service';
import { UserService } from '../user/user.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let dbService: jest.Mocked<DbService>;
  let roomsService: jest.Mocked<RoomsService>;
  let userService: jest.Mocked<UserService>;

  const findManyStub = jest.fn().mockResolvedValue([bookingMock]);
  const findFirstStub = jest.fn().mockResolvedValue(bookingMock);
  const findUniqueStub = jest.fn().mockResolvedValue(bookingMock);

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(BookingsService).compile();
    service = unit;
    dbService = unitRef.get(DbService);
    roomsService = unitRef.get(RoomsService);
    userService = unitRef.get(UserService);

    dbService.booking.findMany = findManyStub;
    dbService.booking.findFirst = findFirstStub;
    dbService.booking.findUnique = findUniqueStub;
    dbService.booking.delete = jest.fn().mockResolvedValue(bookingMock);
    dbService.booking.create = jest.fn().mockResolvedValue(bookingMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getBookings', async () => {
    const result = await service.getBookings();
    expect(result).toEqual([bookingMock]);
  });

  describe('createBooking', () => {
    it('should return booking', async () => {
      roomsService.findById.mockResolvedValue(roomMock);
      findFirstStub.mockResolvedValueOnce(null);
      userService.findById.mockResolvedValue(userMock);

      const result = await service.createBooking(1, new Date(), new Date(), 1);
      expect(result).toEqual(bookingMock);
    });

    it('should return null if room not found', async () => {
      roomsService.findById.mockResolvedValue(null);
      const result = async () =>
        await service.createBooking(1, new Date(), new Date(), 1);
      expect(result).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should throw if room not available', async () => {
      roomsService.findById.mockResolvedValue(roomMock);
      findFirstStub.mockResolvedValueOnce(bookingMock);
      const result = async () =>
        await service.createBooking(1, new Date(), new Date(), 1);
      expect(result).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should return null if user not found', async () => {
      roomsService.findById.mockResolvedValue(roomMock);
      findFirstStub.mockResolvedValueOnce(null);
      userService.findById.mockResolvedValue(null);
      const result = async () =>
        await service.createBooking(1, new Date(), new Date(), 1);
      expect(result).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe('deleteBooking', () => {
    it('should return booking', async () => {
      const result = await service.deleteBooking(1);
      expect(result).toEqual(bookingMock);
    });

    it('should throw if booking not found', async () => {
      findUniqueStub.mockResolvedValueOnce(null);
      const result = async () => await service.deleteBooking(1);
      expect(result).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
