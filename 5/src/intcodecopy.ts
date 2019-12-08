type Operator = (args: number[]) => number;
const add: Operator = ([a, b]: number[]) => a + b;
const mul: Operator = ([a, b]: number[]) => a * b;

type Instruction = number | false;

export interface State {
  instructionType: Instruction;
  parameterModes: number[];
  rands: number[];
  output: number[];
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

export class Intcode {
  private state: State;
  private input: number;
  private instructions: number[];

  constructor(input: number, initialState?: State) {
    this.input = input;
    this.instructions = [];
    if (initialState) this.state = initialState;
    else
      this.state = {
        instructionType: false,
        parameterModes: [],
        rands: [],
        output: []
      };
  }

  run(instructions: number[]) {
    this.instructions = instructions;

    for (let i = 0; i < instructions.length; i++) {
      let instruction = instructions[i];
      this.processInstruction(instruction);
    }
    return instructions;
  }

  private setInstruction(curr: number) {
    if (curr === 99) return;
    let { para, ins } = getParameterModes(curr);
    this.state.instructionType = ins;
    this.state.parameterModes = para;
  }

  private setParameterMode() {
    return this.state.parameterModes.pop();
  }

  private clearEphemeralState() {
    Object.assign(this.state, {
      instructionType: false,
      parameterModes: [],
      rands: []
    });
  }

  private setRand(curr: number, parameterMode: number | undefined) {
    if (parameterMode === 0) {
      this.state.rands.push(this.instructions[curr]);
    }
    if (parameterMode === 1) this.state.rands.push(curr);
  }

  private isReadyToExecute() {
    return this.state.rands.length === 2 && this.state.instructionType;
  }

  private executeInstruction(curr: number) {
    let mode = this.setParameterMode();
    if (this.isReadyToExecute()) {
      switch (this.state.instructionType) {
        case 1:
          this.instructions[curr] = add(this.state.rands);
          break;
        case 2:
          this.instructions[curr] = mul(this.state.rands);
          break;
        case 3:
          this.instructions[curr] = this.input;
          break;
        case 4:
          if (mode === 1) this.state.output.push(curr);
          else this.state.output.push(this.instructions[curr]);
          break;
      }
      this.clearEphemeralState();
    } else {
      this.setRand(curr, mode);
    }
  }

  private processInstruction(curr: number) {
    if (!this.state.instructionType) {
      return this.setInstruction(curr);
    } else {
      this.executeInstruction(curr);
    }
  }
}

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
          clearEphemeralState(state);
        }
        if (state.instructionType === 4) {
          if (mode === 1) state.output.push(instruction);
          else state.output.push(instructions[instruction]);
          clearEphemeralState(state);
        }
      } else {
        if (state.rands.length === 2 && state.instructionType) {
          instructions[instruction] = rator(state.instructionType)(state.rands);
          clearEphemeralState(state);
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

const clearEphemeralState = (state: State) =>
  Object.assign(state, {
    instructionType: false,
    parameterModes: [],
    rands: []
  });

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
