import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize a single word', () => {
    const result = pipe.transform('john');
    expect(result).toBe('John');
  });

  it('should capitalize multiple words', () => {
    const result = pipe.transform('john doe');
    expect(result).toBe('John Doe');
  });

  it('should handle empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle single letter words', () => {
    const result = pipe.transform('a b c');
    expect(result).toBe('A B C');
  });
});
