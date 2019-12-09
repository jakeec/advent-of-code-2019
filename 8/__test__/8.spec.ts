import { fn } from "../src";
import input from "../input.json";

describe("Day 8", () => {
  it("Should get number of ones * number of twos in layer with least zeroes", () => {
    const result = fn(input);
    expect(result).toBe(2080);
  });
});
