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
