const add = ([a, b]: number[]) => a + b;
const mul = ([a, b]: number[]) => a * b;

type Instruction = number | false;
type Mode = number | undefined;

export interface State {
  instructionType: Instruction;
  parameterModes: number[];
  rands: number[];
  output: number[];
}

export class Intcode {
  private state: State;
  private input: number;
  private instructions: number[];
  private curr: number;
  private end: boolean;
  private index: number;
  private instructionMode: number | boolean;

  constructor(input: number, initialState?: State) {
    this.curr = 0;
    this.index = 0;
    this.end = false;
    this.input = input;
    this.instructions = [];
    this.instructionMode = 0;
    if (initialState) this.state = initialState;
    else
      this.state = {
        instructionType: false,
        parameterModes: [],
        rands: [],
        output: []
      };
  }

  g(curr: number) {
    const params = curr
      .toString()
      .padStart(5, '0')
      .split('')
      .map(v => parseInt(v));
    const para = params.slice(0, 3);
    const ins: Instruction = params.pop() || false;
    return { para, ins };
  }

  run(is: number[]) {
    let c = 0;
    let instruction = 0;
    let modes: number[];
    const m = (c: number, m: number) => {
      if (modes[m] === 0) return is[c];
      else return c;
    };

    for (let i = 0; i < is.length; i++) {
      instruction = is[c];
      if (instruction == 99) return is;
      let { para, ins } = this.g(instruction);
      modes = para;
      switch (ins) {
        case 1:
          is[is[c + 3]] = is[m(c + 1, 2)] + is[m(c + 2, 1)];
          c += 4;
          break;
        case 2:
          is[is[c + 3]] = is[m(c + 1, 2)] * is[m(c + 2, 1)];
          c += 4;
          break;
        case 3:
          is[is[c + 1]] = this.input;
          c += 2;
          break;
        case 4:
          this.state.output.push(is[m(c + 1, 2)]);
          c += 2;
          break;
        case 5:
          if (is[m(c + 1, 2)] !== 0) c = is[m(c + 2, 1)];
          else c += 3;
          break;
        case 6:
          if (is[m(c + 1, 2)] === 0) c = is[m(c + 2, 1)];
          else c += 3;
          break;
        case 7:
          if (is[m(c + 1, 2)] < is[m(c + 2, 1)]) is[is[c + 3]] = 1;
          else is[is[c + 3]] = 0;
          c += 4;
          break;
        case 8:
          if (is[m(c + 1, 2)] === is[m(c + 2, 1)]) is[is[c + 3]] = 1;
          else is[is[c + 3]] = 0;
          c += 4;
          break;
      }
    }
  }
}
