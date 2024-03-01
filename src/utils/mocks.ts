export const userMock = {
  id: 1,
  name: 'test',
  email: 'test@test.com',
};

export const roomMock = {
  id: 1,
  name: 'test',
};

export const bookingMock = {
  id: 1,
  roomId: 1,
  userId: 1,
  user: userMock,
  startTime: new Date(),
  endTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
