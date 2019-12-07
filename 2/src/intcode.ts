const add = ([a, b]: number[]) => a + b;
const mul = ([a, b]: number[]) => a * b;

export const intcode = (input: number[]) => {
  let rator = null;
  let rands = [];
  for (let i = 0; i < input.length; i++) {
    let curr = input[i];
    if (rands.length === 2 && rator) {
      input[curr] = rator(rands);
      rator = null;
      rands = [];
    } else {
      switch (curr) {
        case 1:
          if (rator) rands.push(input[curr]);
          else rator = add;
          break;
        case 2:
          if (rator) rands.push(input[curr]);
          else rator = mul;
          break;
        case 99:
          if (rator) {
            rands.push(input[curr]);
            break;
          }
          return input;
        default:
          if (rator) rands.push(input[curr]);
      }
    }
  }
  return input;
};
