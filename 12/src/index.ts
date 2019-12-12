export const fn = () => {
  console.log("hello");
};

interface IVec {
  x: number;
  y: number;
  z: number;
}

interface IMoon {
  name: string;
  pos: IVec;
  vel: IVec;
  kineticEnergy: number;
  potentialEnergy: number;
  totalEnergy: number;
}

export class Vec implements IVec {
  constructor(public x: number, public y: number, public z: number) {}
}

export class Moon implements IMoon {
  constructor(public name: string, public pos: IVec, public vel: IVec) {}

  get kineticEnergy() {
    return getAbsoluteSumOfVec(this.vel);
  }

  get potentialEnergy() {
    return getAbsoluteSumOfVec(this.pos);
  }

  get totalEnergy() {
    return this.potentialEnergy * this.kineticEnergy;
  }
}

const getAbsoluteSumOfVec = (vec: IVec) => {
  const x = Math.abs(vec.x);
  const y = Math.abs(vec.y);
  const z = Math.abs(vec.z);
  return x + y + z;
};

const copyMoon = (moon: Moon) =>
  new Moon(
    moon.name,
    mergeDeltas([new Vec(0, 0, 0), moon.pos]),
    mergeDeltas([new Vec(0, 0, 0), moon.vel])
  );

export const stepThroughTimeUntilBackToStartState = (moons: Moon[]) => {
  const startState = moons.map(moon => copyMoon(moon));
  console.log(findMoonPhase(moons, moons[3]));
  const phases = moons.map(moon => findMoonPhase(moons, moon));
  console.log(phases);
  const phase = phases.reduce((total, phase, currentIndex, array) => {
    total *= phase;
    return total;
  }, 1);

  console.log(phase);
};

const findMoonPhase = (moons: Moon[], moon: Moon) => {
  const startState = moons.map(moon => copyMoon(moon));
  const startMoon = copyMoon(moon);
  const x = findMoonAxisPhase(startState, startMoon, "x");
  const y = findMoonAxisPhase(startState, startMoon, "y");
  const z = findMoonAxisPhase(startState, startMoon, "z");
  return x * y * z;
};

const findMoonAxisPhase = (
  moons: Moon[],
  moon: Moon,
  axis: "x" | "y" | "z"
) => {
  const startMoon = copyMoon(moon);
  const startState = moons.map(moon => copyMoon(moon));
  let axisBackToStart = 0;
  let c = 0;
  while (axisBackToStart === 0) {
    stepTimeForward(startState);
    c++;
    if (startMoon.pos[axis] === startState[0].pos[axis]) {
      axisBackToStart = c;
    }
  }
  return c;
};

export const stepTimeForwardXSteps = (x: number, moons: Moon[]) => {
  for (let i = 0; i < x; i++) {
    stepTimeForward(moons);
  }
  return moons.reduce<number>((totalEnergy, moon, currentIndex, array) => {
    totalEnergy += moon.totalEnergy;
    return totalEnergy;
  }, 0);
};

export const stepTimeForward = (moons: Moon[]) => {
  applyGravity(moons);
  applyVelocity(moons);
};

export const applyVelocity = (moons: Moon[]) => {
  moons.forEach(moon => {
    moon.pos.x += moon.vel.x;
    moon.pos.y += moon.vel.y;
    moon.pos.z += moon.vel.z;
  });
};

export const applyGravity = (moons: Moon[]) => {
  const pairs = getEveryPairCombination(moons);
  const deltas: IVec[][] = [];
  pairs.forEach(([moonA, moonB]: Moon[]) => {
    deltas.push(findGravityDiffBasedOnPosition(moonA, moonB));
  });
  deltas.forEach(([deltaA, deltaB], i) => {
    pairs[i][0].vel = mergeDeltas([pairs[i][0].vel, deltaA]);
    pairs[i][1].vel = mergeDeltas([pairs[i][1].vel, deltaB]);
  });
};

const findGravityDiffBasedOnPosition = (moonA: Moon, moonB: Moon): IVec[] => {
  const findDeltas = findDeltasOnAxis(moonA, moonB);
  const [xDeltaA, xDeltaB] = findDeltas("x");
  const [yDeltaA, yDeltaB] = findDeltas("y");
  const [zDeltaA, zDeltaB] = findDeltas("z");
  const deltaA = mergeDeltas([xDeltaA, yDeltaA, zDeltaA]);
  const deltaB = mergeDeltas([xDeltaB, yDeltaB, zDeltaB]);
  return [deltaA, deltaB];
};

const mergeDeltas = (vecs: IVec[]): IVec => {
  const delta = new Vec(0, 0, 0);
  vecs.forEach(vec => {
    delta.x += vec.x;
    delta.y += vec.y;
    delta.z += vec.z;
  });
  return delta;
};

const findDeltasOnAxis = (moonA: Moon, moonB: Moon) => (
  axis: "x" | "y" | "z"
) => {
  const deltaA = new Vec(0, 0, 0);
  const deltaB = new Vec(0, 0, 0);
  if (moonA.pos[axis] > moonB.pos[axis]) {
    deltaA[axis] -= 1;
    deltaB[axis] += 1;
  } else if (moonA.pos[axis] < moonB.pos[axis]) {
    deltaA[axis] += 1;
    deltaB[axis] -= 1;
  }

  return [deltaA, deltaB];
};

export const getEveryPairCombination = <T>(array: T[]): T[][] => {
  const localArray = Array.from(array);
  const pairs: T[][] = [];
  const firstItem = localArray.shift();
  if (firstItem) {
    localArray.forEach((item: T) => {
      pairs.push([firstItem, item]);
    });
  }
  if (localArray.length > 1) {
    pairs.push(...getEveryPairCombination(localArray));
  }
  return pairs;
};
