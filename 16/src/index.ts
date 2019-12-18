export const fn = (input: string, phases: number = 1) => {
  let output: number[] = [];
  let phase: number[] = [];
  for (let i = 0; i < phases; i++) {
    calculateNextPhase(input, output);
    input = arrayToNumber(output);
    phase = output;
    output = [];
  }
  return arrayToNumber(phase);
};

const amplifySignal = (input: string, amount: number) => {
  const amplified: string[] = [];
  for (let i = 0; i < amount; i++) {
    amplified.push(input);
  }

  return amplified.join("");
};

export const part2 = (input: string, phases: number = 1) => {
  input = amplifySignal(input, 10000);
  let output: number[] = [];
  let phase: number[] = [];
  for (let i = 0; i < phases; i++) {
    fasterNextPhase(input, output);
    input = arrayToNumber(output);
    phase = output;
    output = [];
  }
  return arrayToNumber(phase);
};

const fasterNextPhase = (input: string, output: number[]) => {
  let reversed = numberToArray(input).reverse();
  output.push(reversed[0]);

  for (let i = 1; i < reversed.length; i++) {
    output[i] = (reversed[i] + output[i - 1]) % 10;
  }

  output = output.reverse();
};

const calculateNextPhase = (input: string, output: number[]) => {
  numberToArray(input).forEach((n, i, a) => {
    let pattern = createRepeatingPattern(i + 1);
    let nextPatternItem = getNextItemFromRepeatingPattern(pattern);
    let converted = a.reduce<number>((prev, curr) => {
      let con = curr * nextPatternItem();
      prev += con;
      return prev;
    }, 0);
    let item = converted
      .toString()
      .split("")
      .pop();
    if (item) output.push(parseInt(item));
  });
};

export const createRepeatingPattern = (index: number) => {
  const basePattern = [0, 1, 0, -1];
  const modifiedPattern: number[] = [];
  basePattern.forEach(p => {
    for (let i = 0; i < index; i++) {
      modifiedPattern.push(p);
    }
  });
  return modifiedPattern;
};

const numberToArray = (input: string) =>
  leftPadArray(
    input.split("").map(i => parseInt(i)),
    8
  );

const leftPadArray = (array: number[], desiredLength: number) => {
  const remaining = desiredLength - array.length;
  if (remaining < 1) return array;
  const paddedArray = Array.from(array);
  for (let i = 0; i < remaining; i++) {
    paddedArray.unshift(0);
  }
  return paddedArray;
};

const arrayToNumber = (input: number[]) => input.join("");

export const getNextItemFromRepeatingPattern = (pattern: number[]) => {
  let c = 1;
  return () => {
    let value = pattern[c];
    c++;
    if (c >= pattern.length) c = 0;
    return value;
  };
};
