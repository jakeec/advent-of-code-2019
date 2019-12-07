interface Coord {
  x: number;
  y: number;
}

interface Line {
  a: Coord;
  b: Coord;
}

export const line = (a: Coord, b: Coord) => {
  return {
    a,
    b
  };
};

export const coord = (x: number, y: number): Coord => {
  return {
    x,
    y
  };
};

const parseInstruction = (instruction: string) => {
  const [dir, mag] = instruction.split(/(?<=U|D|L|R)/);
  switch (dir) {
    case 'U':
      return coord(0, parseInt(mag));
    case 'D':
      return coord(0, -mag);
    case 'L':
      return coord(-mag, 0);
    case 'R':
      return coord(parseInt(mag), 0);
  }
};

export const constructCoordsFromInstructions = (input: string[]) => {
  const output: any[] = [];
  for (let i = 0; i < input.length; i++) {
    let coord = parseInstruction(input[i]);
    if (coord && output[i - 1]) {
      coord.x = coord.x + output[i - 1].x;
      coord.y = coord.y + output[i - 1].y;
    }
    output.push(coord);
  }
  return output;
};

export const constructLinesFromCoords = (
  input: Coord[],
  startingPoint: Coord = coord(0, 0)
) => {
  const lines = [];
  lines.push(line(startingPoint, input[0]));
  for (let i = 1; i < input.length; i++) {
    lines.push(line(input[i - 1], input[i]));
  }
  return lines;
};

const flipLine = (l: Line) => {
  return line(l.b, l.a);
};

const getIntersection = (horiz: Line, vert: Line) => {
  if (horiz.a.x > horiz.b.x) horiz = flipLine(horiz);
  if (vert.a.y > vert.b.y) vert = flipLine(vert);
  if (horiz.a.x < vert.a.x && vert.a.x < horiz.b.x) {
    if (vert.a.y < horiz.a.y && horiz.a.y < vert.b.y) {
      return coord(vert.a.x, horiz.a.y);
    }
  }
  return false;
};

export const getPointOfIntersection = (a: Line, b: Line) => {
  let aHoriz = false;
  let bHoriz = false;
  if (a.a.y === a.b.y) aHoriz = true;
  if (b.a.y === b.b.y) bHoriz = true;
  if (aHoriz && bHoriz) return false;
  if (!aHoriz && !bHoriz) return false;
  if (aHoriz) {
    return getIntersection(a, b);
  }
  if (bHoriz) {
    return getIntersection(b, a);
  }
  return false;
};

export const findAllPointsOfIntersection = (
  wireA: string[],
  wireB: string[]
) => {
  const coordsA = constructCoordsFromInstructions(wireA);
  const linesA = constructLinesFromCoords(coordsA);
  const coordsB = constructCoordsFromInstructions(wireB);
  const linesB = constructLinesFromCoords(coordsB);
  const intersections = [];
  for (let a = 0; a < linesA.length; a++) {
    for (let b = 0; b < linesB.length; b++) {
      let intersection = getPointOfIntersection(linesA[a], linesB[b]);
      if (intersection) intersections.push(intersection);
    }
  }
  return intersections;
};

const getLengthOfLine = (line: Line) => {
  const a = Math.abs(line.b.x - line.a.x);
  const b = Math.abs(line.b.y - line.a.y);
  // return Math.sqrt((a ^ 2) + (b ^ 2));
  return a + b;
};

export const closestPointOfIntersection = (origin: Coord, points: Coord[]) => {
  let smallest;
  let coords;
  for (let i = 0; i < points.length; i++) {
    let length = getLengthOfLine(line(origin, points[i]));
    if (!smallest || length < smallest) {
      smallest = length;
      coords = points[i];
    }
  }
  return smallest;
};

import input from '../input.json';

const points = findAllPointsOfIntersection(input[0], input[1]);
const result = closestPointOfIntersection(coord(0, 0), points);
console.log(result);
