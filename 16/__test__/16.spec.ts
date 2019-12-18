import {
  fn,
  getNextItemFromRepeatingPattern,
  createRepeatingPattern
} from "../src";

describe("Day 0", () => {
  it("should have a helper function which provides a repeating pattern", () => {
    const repeatingPattern = getNextItemFromRepeatingPattern([1, 2, 3]);
    expect(repeatingPattern()).toBe(2);
    expect(repeatingPattern()).toBe(3);
    expect(repeatingPattern()).toBe(1);
    expect(repeatingPattern()).toBe(2);
    expect(repeatingPattern()).toBe(3);
  });

  it("should have a helper function that creates a repeating pattern", () => {
    const pattern = createRepeatingPattern(1);
    expect(pattern).toEqual([0, 1, 0, -1]);
    const pattern2 = createRepeatingPattern(2);
    expect(pattern2).toEqual([0, 0, 1, 1, 0, 0, -1, -1]);
    const pattern3 = createRepeatingPattern(3);
    expect(pattern3).toEqual([0, 0, 0, 1, 1, 1, 0, 0, 0, -1, -1, -1]);
  });

  it("should find the next pattern", () => {
    const result = fn("12345678", 1);
    expect(result).toBe("48226158");
  });

  it("should find phase 2", () => {
    const result = fn("12345678", 2);
    expect(result).toBe("34040438");
  });

  it("after 4 phases should equal 01029498", () => {
    const result = fn("12345678", 4);
    expect(result).toBe("01029498");
  });

  it("example 1", () => {
    const result = fn("80871224585914546619083218645595", 100);
    expect(result.slice(0, 8)).toBe("24176176");
  });
});
