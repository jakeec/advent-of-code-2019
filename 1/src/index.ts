import { fuelCalculator } from './fuelCalculator';
import input from '../input.json';

const fuelValues: number[] = input.map(mass => fuelCalculator(mass));
const result = fuelValues.reduce((prev, curr) => {
  return prev + curr;
});

console.log(result);

export { fuelCalculator };
