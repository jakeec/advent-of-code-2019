import { totalOrbits, orbitalTransfers } from "../src";
import input from "../input.json";

describe("Day 0", () => {
  describe("totalOrbits", () => {
    it("should equal 42", () => {
      const result = totalOrbits([
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

    it("puzzle input should equal 144909", () => {
      const result = totalOrbits(input);
      expect(result).toEqual(144909);
    });
  });

  describe("orbitalTransfers", () => {
    it("does something", () => {
      const result = orbitalTransfers(
        [
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
          "K)L",
          "K)YOU",
          "I)SAN"
        ],
        "YOU",
        "SAN"
      );
    });
  });
});
