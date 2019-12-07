import { isValid, isValid2 } from '../src';

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

  describe('isValid2', () => {
    it('111111 should not be valid', () => {
      const result = isValid2(111111);
      expect(result).toBe(false);
    });

    it('223450 should not be valid', () => {
      const result = isValid2(223450);
      expect(result).toBe(false);
    });

    it('123789 should not be valid', () => {
      const result = isValid2(123789);
      expect(result).toBe(false);
    });

    it('112233 should be valid', () => {
      const result = isValid2(112233);
      expect(result).toBe(true);
    });

    it('123444 should not be valid', () => {
      const result = isValid2(123444);
      expect(result).toBe(false);
    });

    it('111122 should be valid', () => {
      const result = isValid2(111122);
      expect(result).toBe(true);
    });

    it('111234 should not be valid', () => {
      const result = isValid2(111234);
      expect(result).toBe(false);
    });
  });
});
