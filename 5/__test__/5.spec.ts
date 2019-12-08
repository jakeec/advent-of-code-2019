import { intcode } from '../src';
import { getParameterModes, State } from '../src/intcode';
import puzzleInput from '../input.json';
import fs from 'fs';

describe('Day 5', () => {
  // it('given [1,0,0,0,99] return [2,0,0,0,99]', () => {
  //   const result = intcode([1, 0, 0, 0, 99]);
  //   expect(result).toEqual([2, 0, 0, 0, 99]);
  // });
  // it('given [2,3,0,3,99] return [2, 3, 0, 6, 99]', () => {
  //   const result = intcode([2, 3, 0, 3, 99]);
  //   expect(result).toEqual([2, 3, 0, 6, 99]);
  // });
  // it('given [2,4,4,5,99,0] return [2, 4, 4, 5, 99, 9801]', () => {
  //   const result = intcode([2, 4, 4, 5, 99, 0]);
  //   expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
  // });
  // it('given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]', () => {
  //   const result = intcode([1, 1, 1, 4, 99, 5, 6, 0, 99]);
  //   expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  // });
  // it('given [1,1,1,4,99,5,6,0,99] return [30,1,1,4,2,5,6,0,99]', () => {
  //   const result = intcode([1, 1, 1, 4, 99, 5, 6, 0, 99]);
  //   expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  // });

  describe('getParameterModes', () => {
    it('should return [0, 0, 0] and 2 for input 2', () => {
      const result = getParameterModes(2);
      expect(result.para).toEqual([0, 0, 0]);
      expect(result.ins).toEqual(2);
    });

    it('should return [0, 1, 0] and 1 for input 1001', () => {
      const result = getParameterModes(1001);
      expect(result.para).toEqual([0, 1, 0]);
      expect(result.ins).toEqual(1);
    });
  });

  describe('intcode', () => {
    it('something', () => {
      const state: State = {
        instructionType: false,
        parameterModes: [0, 0, 0],
        rands: [],
        output: 0
      };

      const program = intcode(state, 1);
      const output = program([1002, 4, 3, 4, 33]);
      expect(output).toEqual([1002, 4, 3, 4, 99]);
    });

    it('something', () => {
      const state: State = {
        instructionType: false,
        parameterModes: [0, 0, 0],
        rands: [],
        output: 0
      };

      const program = intcode(state, 1);
      const output = program([1001, 4, 3, 2, 1, 8, 1, 1, 99, 1, 1, 1]);
      expect(output).toEqual([1001, 103, 4, 2, 1, 8, 1, 1, 99, 1, 1, 1]);
    });

    it('something', () => {
      const state: State = {
        instructionType: false,
        parameterModes: [0, 0, 0],
        rands: [],
        output: 0
      };

      const program = intcode(state, 1);
      const output = program(puzzleInput);
    });
  });
});
