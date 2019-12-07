import { isValid } from '../src';

describe('Day 4', () => {
  describe('isValid', () => {
    it('111111 should be valid', () => {
      const result = isValid(111111);
      expect(result).toBe(true);
    });

    it('223450 should not be valid', () => {
      const result = isValid(223450);
      expect(result).toBe(false);
    });

    it('123789 should not be valid', () => {
      const result = isValid(123789);
      expect(result).toBe(false);
    });
  });
});
