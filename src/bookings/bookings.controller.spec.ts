import { BookingsController } from './bookings.controller';
import { TestBed } from '@automock/jest';
import { BookingsService } from './bookings.service';
import { bookingMock } from '../utils/mocks';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: jest.Mocked<BookingsService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(BookingsController).compile();
    controller = unit;
    service = unitRef.get(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
    service.getBookings.mockResolvedValue([bookingMock]);
    const result = await controller.findAll();
    expect(result).toEqual([bookingMock]);
  });

  it('create', async () => {
    service.createBooking.mockResolvedValue(bookingMock);
    const result = await controller.createBooking(
      {
        roomId: 1,
        startTime: new Date(),
        endTime: new Date(),
      },
      { user: { id: 1 } },
    );
    expect(result).toEqual(bookingMock);
  });

  describe('room availability', () => {
    it('should return true if availability', async () => {
      service.checkRoomAvailability.mockResolvedValue(true);
      const result = await controller.checkRoomAvailability(
        1,
        new Date(),
        new Date(),
      );
      expect(result).toEqual(true);
    });

    it('should return false if not availability', async () => {
      service.checkRoomAvailability.mockResolvedValue(false);
      const result = await controller.checkRoomAvailability(
        1,
        new Date(),
        new Date(),
      );
      expect(result).toEqual(false);
    });
  });
});
