import { BadgeValuePipe } from './badge-value.pipe';

describe('BadgeValuePipe', () => {
  let pipe: BadgeValuePipe;

  beforeEach(() => {
    pipe = new BadgeValuePipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value is 0 or undefined', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform(undefined as unknown as number)).toBe('');
  });

  it('should return the number as string if it is <= 9', () => {
    expect(pipe.transform(1)).toBe('1');
    expect(pipe.transform(5)).toBe('5');
    expect(pipe.transform(9)).toBe('9');
  });

  it('should return "9+" if number is greater than 9', () => {
    expect(pipe.transform(10)).toBe('9+');
    expect(pipe.transform(15)).toBe('9+');
    expect(pipe.transform(100)).toBe('9+');
  });
});
