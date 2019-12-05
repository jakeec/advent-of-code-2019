import { fuelCalculator } from '../src/fuelCalculator';

describe('Day 1', () => {
  describe('calculateTotalFuel', () => {
    [
      { input: 14, expected: 2 },
      { input: 1969, expected: 966 },
      { input: 100756, expected: 50346 }
    ].forEach(({ input, expected }) => {
      it(`given ${input} should return ${expected}`, () => {
        const result = fuelCalculator(input);
        expect(result).toBe(expected);
      });
    });
  });
});
