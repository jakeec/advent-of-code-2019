import { Intcode } from "./intcode";
import ACS from "../ACS.json";

export const amplifiers = (program: number[], phaseSettings: number[]) => {
  const AmpA = new Intcode(Array.from(program));
  const AmpB = new Intcode(Array.from(program));
  const AmpC = new Intcode(Array.from(program));
  const AmpD = new Intcode(Array.from(program));
  const AmpE = new Intcode(Array.from(program));

  let a, b, c, d, e;
  let [pa, pb, pc, pd, pe] = phaseSettings;
  a = runAmplifier(AmpA, [pa, 0]);
  if (a) {
    b = runAmplifier(AmpB, [pb, a]);
  }

  if (b) {
    c = runAmplifier(AmpC, [pc, b]);
  }

  if (c) {
    d = runAmplifier(AmpD, [pd, c]);
  }

  if (d) {
    e = runAmplifier(AmpE, [pe, d]);
  }

  return e;
};

export const getHighestSignal = (input: number[]) => {
  const arrangements = getEveryOrderOfArray(input);
  let highestSignal = 0;
  arrangements.forEach(a => {
    console.log(highestSignal);
    let signal = amplifiers(ACS, a);
    console.log(signal);
    if (signal && signal > highestSignal) highestSignal = signal;
  });
  return highestSignal;
};

export const getEveryOrderOfArray = (input: number[]) => {
  let arrangements: number[][] = [];
  let firstNumbers: number[] = [];
  input.forEach(i => firstNumbers.push(i));
  firstNumbers.forEach(n => {
    let remaining: any = input.filter(d => d !== n);
    if (remaining.length > 1) remaining = getEveryOrderOfArray(remaining);
    remaining.forEach((r: any) => {
      arrangements.push([n, ...r]);
    });
  });
  return arrangements;
};

const runAmplifier = (amplifier: Intcode, input: number[]) => {
  if (!(input.length > 0)) throw new Error("Input was null");
  const out = amplifier.run(input);
  if (out) return out[0];
  else throw new Error("Amplifier failed!");
};

export { Intcode };
