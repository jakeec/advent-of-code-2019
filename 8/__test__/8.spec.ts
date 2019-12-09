import { fn, asColumns, finalImage } from "../src";
import input from "../input.json";

describe("Day 8", () => {
  it("Should get number of ones * number of twos in layer with least zeroes", () => {
    const result = fn(input);
    expect(result).toBe(2080);
  });

  it("finalImage", () => {
    const result = finalImage(input);
  });

  it("should convert to columns", () => {
    const input = [
      [
        [1, 2, 3, 0],
        [4, 5, 6, 0],
        [7, 8, 9, 0]
      ],
      [
        [11, 12, 13, 10],
        [14, 15, 16, 10],
        [17, 18, 19, 10]
      ]
    ];
    const result = asColumns(input);
    expect(result).toEqual([
      [
        [1, 11],
        [2, 12],
        [3, 13],
        [0, 10]
      ],
      [
        [4, 14],
        [5, 15],
        [6, 16],
        [0, 10]
      ],
      [
        [7, 17],
        [8, 18],
        [9, 19],
        [0, 10]
      ]
    ]);
  });
});
