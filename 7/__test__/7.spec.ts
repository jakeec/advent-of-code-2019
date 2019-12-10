import {
  Intcode,
  amplifiers,
  getEveryOrderOfArray,
  getHighestSignal
} from "../src";
import { State } from "../src/intcode";
import puzzleInput from "../input.json";
import ACS from "../ACS.json";
import fs from "fs";

const largeExample = [
  3,
  21,
  1008,
  21,
  8,
  20,
  1005,
  20,
  22,
  107,
  8,
  21,
  20,
  1006,
  20,
  31,
  1106,
  0,
  36,
  98,
  0,
  0,
  1002,
  21,
  125,
  20,
  4,
  20,
  1105,
  1,
  46,
  104,
  999,
  1105,
  1,
  46,
  1101,
  1000,
  1,
  20,
  4,
  20,
  1105,
  1,
  46,
  98,
  99
];

describe("Day 7", () => {
  // it("given [1,0,0,0,99] return [2,0,0,0,99]", () => {
  //   const result = new Intcode(1).run([1, 0, 0, 0, 99]);
  //   expect(result).toEqual([2, 0, 0, 0, 99]);
  // });
  // it("given [2,3,0,3,99] return [2, 3, 0, 6, 99]", () => {
  //   const result = new Intcode(1).run([2, 3, 0, 3, 99]);
  //   expect(result).toEqual([2, 3, 0, 6, 99]);
  // });
  // it("given [2,4,4,5,99,0] return [2, 4, 4, 5, 99, 9801]", () => {
  //   const result = new Intcode(1).run([2, 4, 4, 5, 99, 0]);
  //   expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
  // });
  // it("given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]", () => {
  //   const result = new Intcode(1).run([1, 1, 1, 4, 99, 5, 6, 0, 99]);
  //   expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  // });
  // it("given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]", () => {
  //   const result = new Intcode(1).run([1, 1, 1, 4, 99, 5, 6, 0, 99]);
  //   expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  // });

  // it("given [1002,4,3,4,33] return [1002,4,3,4,99]", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(1, state);
  //   const output = program.run([1002, 4, 3, 4, 33]);
  //   expect(output).toEqual([1002, 4, 3, 4, 99]);
  // });

  // it("given [1001,4,3,2,1,8,1,1,99,1,1,1] return [1001,103,4,2,1,8,1,1,99,1,1,1]", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(1, state);
  //   const output = program.run([1001, 4, 3, 2, 1, 8, 1, 1, 99, 1, 1, 1]);
  //   expect(output).toEqual([1001, 103, 4, 2, 1, 8, 1, 1, 99, 1, 1, 1]);
  // });

  // it("given puzzle input return 14155342", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(1, state);
  //   const output = program.run(Array.from(puzzleInput));
  //   console.log(state.output);
  //   expect(state.output.pop()).toBe(14155342);
  // });

  // it("given puzzle input return 14155342", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(8, state);
  //   const output = program.run([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]);
  //   expect(state.output.pop()).toBe(1);
  // });

  // it("given puzzle input return 14155342", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(8, state);
  //   const output = program.run([103, 3, 1108, -1, 8, 3, 4, 3, 99]);
  //   expect(state.output.pop()).toBe(1);
  // });

  // it("given puzzle input return 14155342", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(7, state);
  //   const output = program.run([103, 3, 1107, -1, 8, 3, 4, 3, 99]);
  //   expect(state.output.pop()).toBe(1);
  // });

  // it("given puzzle input return 14155342", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(7, state);
  //   const output = program.run([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]);
  //   expect(state.output.pop()).toBe(1);
  // });

  // it("given [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9] and 0 should output 0", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(0, state);
  //   const output = program.run([
  //     3,
  //     12,
  //     6,
  //     12,
  //     15,
  //     1,
  //     13,
  //     14,
  //     13,
  //     4,
  //     13,
  //     99,
  //     -1,
  //     0,
  //     1,
  //     9
  //   ]);
  //   expect(state.output.pop()).toBe(0);
  // });

  // it("should halt", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(0, state);
  //   const result = program.run([1, 2, 3, 2, 99, 0, 12, 3, 4]);
  //   expect(result).toEqual([1, 2, 5, 2, 99, 0, 12, 3, 4]);
  // });

  // it("larger example - 8", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(8, state);
  //   const output = program.run(largeExample);
  //   expect(state.output.pop()).toBe(1000);
  // });

  // it("larger example - 6", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(6, state);
  //   const output = program.run(largeExample);
  //   expect(state.output.pop()).toBe(999);
  // });

  // it("larger example - 10", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(10, state);
  //   const output = program.run(largeExample);
  //   expect(state.output.pop()).toBe(1001);
  // });

  // it("TEST program - 5", () => {
  //   const state: State = {
  //     instructionType: false,
  //     parameterModes: [0, 0, 0],
  //     rands: [],
  //     output: []
  //   };

  //   const program = new Intcode(5, state);
  //   const output = program.run(Array.from(puzzleInput));
  //   expect(state.output.pop()).toBe(8684145);
  // });

  describe.only("Amplifier Controller Software", () => {
    describe("getEveryOrderOfArray", () => {
      it("should produce [1,2], [2,1] from [1,2]", () => {
        const input = [1, 2];
        const result = getEveryOrderOfArray(input);
        expect(result).toEqual([
          [1, 2],
          [2, 1]
        ]);
      });

      it("should produce [1,2,3], [1,3,2], [3,1,2], [3,2,1] from [1,2,3]", () => {
        const input = [1, 2, 3];
        const result = getEveryOrderOfArray(input);
        expect(result.toString()).toEqual(
          [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1]
          ].toString()
        );
      });

      it("should produce [1,2,3], [1,3,2], [3,1,2], [3,2,1] from [1,2,3]", () => {
        const input = [1, 2, 3, 4];
        const result = getEveryOrderOfArray(input);
      });
    });

    describe.only("getHighestSignal", () => {
      it("should find highest signal", () => {
        const result = getHighestSignal([0, 1, 2, 3, 4]);
        expect(result).toEqual(77500);
      });
    });

    it("should run without errors", () => {
      const program = new Intcode(Array.from(ACS));
      const result = program.run([1, 1]);
      expect(result).toEqual([5]);
    });

    it("example 1 should produce 43210", () => {
      const result = amplifiers(
        [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0],
        [4, 3, 2, 1, 0]
      );
      expect(result).toBe(43210);
    });

    it("example 2 should produce 54321", () => {
      const result = amplifiers(
        [
          3,
          23,
          3,
          24,
          1002,
          24,
          10,
          24,
          1002,
          23,
          -1,
          23,
          101,
          5,
          23,
          23,
          1,
          24,
          23,
          23,
          4,
          23,
          99,
          0,
          0
        ],
        [0, 1, 2, 3, 4]
      );
      expect(result).toBe(54321);
    });

    it("example 3 should produce 65210", () => {
      const result = amplifiers(
        [
          3,
          31,
          3,
          32,
          1002,
          32,
          10,
          32,
          1001,
          31,
          -2,
          31,
          1007,
          31,
          0,
          33,
          1002,
          33,
          7,
          33,
          1,
          33,
          31,
          31,
          1,
          32,
          31,
          31,
          4,
          31,
          99,
          0,
          0,
          0
        ],
        [1, 0, 4, 3, 2]
      );
      expect(result).toBe(65210);
    });

    it("finds best combination of phase settings", () => {});
  });
});
