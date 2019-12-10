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

  constructor(input: number, initialState?: State) {
    this.input = input;
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
    is.push(...new Array(119999).fill(0));
    let c = 0;
    let instruction = 0;
    let modes: number[];
    let relativeBase = 0;

    const m = (c: number, m: number, d = false) => {
      if (modes[m] === 0) return is[c];
      if (modes[m] === 2) {
        return is[relativeBase + c];
      }
      return c;
    };

    for (let i = 0; i < is.length; i++) {
      instruction = is[c];
      if (instruction == 99) return is.slice(0, c + 1);
      let { para, ins } = this.g(instruction);
      modes = para;
      switch (ins) {
        case 1:
          is[m(c + 3, 0)] = is[m(c + 1, 2)] + is[m(c + 2, 1)];
          c += 4;
          break;
        case 2:
          is[m(c + 3, 0)] = is[m(c + 1, 2)] * is[m(c + 2, 1)];
          c += 4;
          break;
        case 3:
          is[m(c + 1, 2)] = this.input;
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
          if (is[m(c + 1, 2)] < is[m(c + 2, 1)]) is[m(c + 3, 0)] = 1;
          else is[m(c + 3, 0)] = 0;
          c += 4;
          break;
        case 8:
          if (is[m(c + 1, 2)] === is[m(c + 2, 1)]) is[m(c + 3, 0)] = 1;
          else is[m(c + 3, 0)] = 0;
          c += 4;
          break;
        case 9:
          relativeBase += is[m(c + 1, 2)];
          c += 2;
          break;
      }
    }
  }
}
