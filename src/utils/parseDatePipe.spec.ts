import { ParseDatePipe } from './parseDatePipe';

describe('parseDatePipe unit test', () => {
  let pipe: ParseDatePipe;

  beforeAll(() => {
    pipe = new ParseDatePipe();
  });

  it('should return date', () => {
    expect(pipe.transform('2020-01-01 12:30:00')).toEqual(
      new Date('2020-01-01 12:30:00'),
    );
  });

  it('should throw an error if date format is wrong', async () => {
    const result = async () => await pipe.transform('test');
    expect(result).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should throw an error if value not provided', async () => {
    const result = async () => await pipe.transform(null);
    expect(result).rejects.toThrowErrorMatchingSnapshot();
  });
});
