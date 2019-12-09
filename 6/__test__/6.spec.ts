import { fn } from "../src";
import input from "../input.json";

describe("Day 0", () => {
  it("should equal 42", () => {
    const result = fn([
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L"
    ]);
    expect(result).toEqual(42);
  });

  it("puzzle input", () => {
    const result = fn(input);
    expect(result).toEqual(144909);
  });
});
