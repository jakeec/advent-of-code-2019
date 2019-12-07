import { intcode } from '../src';

describe('Day 0', () => {
  it('given [1,0,0,0,99] return [2,0,0,0,99]', () => {
    const result = intcode([1, 0, 0, 0, 99]);
    expect(result).toEqual([2, 0, 0, 0, 99]);
  });

  it('given [2,3,0,3,99] return [2, 3, 0, 6, 99]', () => {
    const result = intcode([2, 3, 0, 3, 99]);
    expect(result).toEqual([2, 3, 0, 6, 99]);
  });

  it('given [2,4,4,5,99,0] return [2, 4, 4, 5, 99, 9801]', () => {
    const result = intcode([2, 4, 4, 5, 99, 0]);
    expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
  });

  it('given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]', () => {
    const result = intcode([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  it('given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]', () => {
    const result = intcode([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
});
