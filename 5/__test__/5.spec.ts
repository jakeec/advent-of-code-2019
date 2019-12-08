import { Intcode } from '../src';
import { State } from '../src/intcode';
import puzzleInput from '../input.json';
import fs from 'fs';

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

describe('Day 5', () => {
  it('given [1,0,0,0,99] return [2,0,0,0,99]', () => {
    const result = new Intcode(1).run([1, 0, 0, 0, 99]);
    expect(result).toEqual([2, 0, 0, 0, 99]);
  });
  it('given [2,3,0,3,99] return [2, 3, 0, 6, 99]', () => {
    const result = new Intcode(1).run([2, 3, 0, 3, 99]);
    expect(result).toEqual([2, 3, 0, 6, 99]);
  });
  it('given [2,4,4,5,99,0] return [2, 4, 4, 5, 99, 9801]', () => {
    const result = new Intcode(1).run([2, 4, 4, 5, 99, 0]);
    expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
  });
  it('given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]', () => {
    const result = new Intcode(1).run([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
  it('given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]', () => {
    const result = new Intcode(1).run([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  it('given [1002,4,3,4,33] return [1002,4,3,4,99]', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(1, state);
    const output = program.run([1002, 4, 3, 4, 33]);
    expect(output).toEqual([1002, 4, 3, 4, 99]);
  });

  it('given [1001,4,3,2,1,8,1,1,99,1,1,1] return [1001,103,4,2,1,8,1,1,99,1,1,1]', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(1, state);
    const output = program.run([1001, 4, 3, 2, 1, 8, 1, 1, 99, 1, 1, 1]);
    expect(output).toEqual([1001, 103, 4, 2, 1, 8, 1, 1, 99, 1, 1, 1]);
  });

  it('given puzzle input return 14155342', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(1, state);
    const output = program.run(Array.from(puzzleInput));
    console.log(state.output);
    expect(state.output.pop()).toBe(14155342);
  });

  it('given puzzle input return 14155342', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(8, state);
    const output = program.run([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]);
    expect(state.output.pop()).toBe(1);
  });

  it('given puzzle input return 14155342', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(8, state);
    const output = program.run([103, 3, 1108, -1, 8, 3, 4, 3, 99]);
    expect(state.output.pop()).toBe(1);
  });

  it('given puzzle input return 14155342', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(7, state);
    const output = program.run([103, 3, 1107, -1, 8, 3, 4, 3, 99]);
    expect(state.output.pop()).toBe(1);
  });

  it('given puzzle input return 14155342', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(7, state);
    const output = program.run([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]);
    expect(state.output.pop()).toBe(1);
  });

  it('given [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9] and 0 should output 0', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(0, state);
    const output = program.run([
      3,
      12,
      6,
      12,
      15,
      1,
      13,
      14,
      13,
      4,
      13,
      99,
      -1,
      0,
      1,
      9
    ]);
    expect(state.output.pop()).toBe(0);
  });

  it('should halt', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(0, state);
    const result = program.run([1, 2, 3, 2, 99, 0, 12, 3, 4]);
    expect(result).toEqual([1, 2, 5, 2, 99, 0, 12, 3, 4]);
  });

  it('larger example - 8', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(8, state);
    const output = program.run(largeExample);
    expect(state.output.pop()).toBe(1000);
  });

  it('larger example - 6', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(6, state);
    const output = program.run(largeExample);
    expect(state.output.pop()).toBe(999);
  });

  it('larger example - 10', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(10, state);
    const output = program.run(largeExample);
    expect(state.output.pop()).toBe(1001);
  });

  it('TEST program - 5', () => {
    const state: State = {
      instructionType: false,
      parameterModes: [0, 0, 0],
      rands: [],
      output: []
    };

    const program = new Intcode(5, state);
    const output = program.run(Array.from(puzzleInput));
    expect(state.output.pop()).toBe(8684145);
  });
});
