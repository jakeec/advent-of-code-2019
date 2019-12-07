import { intcode } from './intcode';
import input from '../input.json';

const initialise = (input: number[]) => {
  input[1] = 12;
  input[2] = 2;
  return input;
};

const initialised = initialise(input);

const resultProgram = intcode(initialised);
const result = resultProgram[0];
console.log(result);

export { intcode };
