type Operator = (args: number[]) => number;
const add: Operator = ([a, b]: number[]) => a + b;
const mul: Operator = ([a, b]: number[]) => a * b;

type Instruction = number | false;

export interface State {
  instructionType: Instruction;
  parameterModes: number[];
  rands: number[];
  output: number;
}

interface Rators {
  [key: number]: Operator;
}

const rator = (code: number) => {
  const rators: Rators = {
    1: add,
    2: mul
  };
  return rators[code];
};

export const intcode = (state: State, input: number) => (
  instructions: number[]
) => {
  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i];
    if (!state.instructionType) {
      if (instruction === 99) break;
      let { para, ins } = getParameterModes(instruction);
      state.instructionType = ins;
      state.parameterModes = para;
    } else {
      let mode = state.parameterModes.pop();
      if ([3, 4].includes(state.instructionType)) {
        if (state.instructionType === 3) {
          instructions[instruction] = input;
          state.instructionType = false;
          state.parameterModes = [];
          state.rands = [];
        }
        if (state.instructionType === 4) {
          if (mode === 1) console.log(instruction);
          else console.log(instructions[instruction]);
          state.instructionType = false;
          state.parameterModes = [];
          state.rands = [];
        }
      } else {
        if (state.rands.length === 2 && state.instructionType) {
          instructions[instruction] = rator(state.instructionType)(state.rands);
          state.rands = [];
          state.instructionType = false;
        } else {
          if (mode === 0) {
            state.rands.push(instructions[instruction]);
          }
          if (mode === 1) state.rands.push(instruction);
        }
      }
    }
  }
  return instructions;
};

export const getParameterModes = (instruction: number) => {
  const params = instruction
    .toString()
    .padStart(5, '0')
    .split('')
    .map(v => parseInt(v));
  const para = params.slice(0, 3);
  const ins: Instruction = params.pop() || false;
  return { para, ins };
};

// export const intcode = (input: number[]) => {
//   let rator = null;
//   let rands = [];
//   let parameter_modes = [];
//   for (let i = 0; i < input.length; i++) {
//     let curr = input[i];
//     if (rands.length === 2 && rator) {
//       input[curr] = rator(rands);
//       rator = null;
//       rands = [];
//     } else {
//       switch (curr) {
//         case 1:
//           if (rator) rands.push(input[curr]);
//           else {
//             parameter_modes = [0, 0, 0];
//             rator = add;
//           }
//           break;
//         case 2:
//           if (rator) rands.push(input[curr]);
//           else {
//             parameter_modes = [0, 0, 0];
//             rator = mul;
//           }
//           break;
//         case 99:
//           if (rator) {
//             rands.push(input[curr]);
//             break;
//           }
//           return input;
//         default:
//           if (rator) rands.push(input[curr]);
//       }
//     }
//   }
//   return input;
// };
