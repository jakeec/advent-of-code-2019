import { intcode } from './intcode';
import input from '../input.json';

const initialise = (input: number[], noun: number, verb: number) => {
  input[1] = noun;
  input[2] = verb;
  return input;
};

const determineNounAndVerb = () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const fresh = [...input];
      let initialised = initialise(fresh, noun, verb);
      let resultProgram = intcode(initialised);
      let result = resultProgram[0];
      if (result === 19690720) return [noun, verb];
    }
  }
};

const [noun, verb] = determineNounAndVerb();
const result = 100 * noun + verb;

console.log(result);

export { intcode };
