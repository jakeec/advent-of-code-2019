import {
  getEveryPairCombination,
  Moon,
  Vec,
  applyGravity,
  applyVelocity,
  stepTimeForward,
  stepTimeForwardXSteps,
  stepThroughTimeUntilBackToStartState
} from "../src";

describe("Day 12", () => {
  describe("getEveryPairCombination", () => {
    it("given [1,2] should return [[1,2]]", () => {
      const input = [1, 2];
      const result = getEveryPairCombination(input);
      expect(result).toEqual([[1, 2]]);
    });

    it("given [1,2,3] should return [[1,2],[1,3],[2,3]]", () => {
      const input = [1, 2, 3];
      const result = getEveryPairCombination(input);
      expect(result).toEqual([
        [1, 2],
        [1, 3],
        [2, 3]
      ]);
    });

    it("given [1,2,3,4] should return [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]", () => {
      const input = [1, 2, 3, 4];
      const result = getEveryPairCombination(input);
      expect(result).toEqual([
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4]
      ]);
    });
  });

  describe("applyGravity", () => {
    it("given Ganymede and Callisto - example", () => {
      const Ganymede = new Moon("Ganymede", new Vec(3, 0, 0), new Vec(0, 0, 0));
      const Callisto = new Moon("Callisto", new Vec(5, 0, 0), new Vec(0, 0, 0));
      applyGravity([Ganymede, Callisto]);
      expect(Ganymede.vel.x).toBe(1);
      expect(Callisto.vel.x).toBe(-1);
    });

    it("given Ganymede and Callisto - all axes", () => {
      const Ganymede = new Moon("Ganymede", new Vec(3, 3, 3), new Vec(0, 0, 0));
      const Callisto = new Moon("Callisto", new Vec(5, 1, 5), new Vec(0, 0, 0));
      applyGravity([Ganymede, Callisto]);
      expect(Ganymede.vel).toEqual(new Vec(1, -1, 1));
      expect(Callisto.vel).toEqual(new Vec(-1, 1, -1));
    });
  });

  describe("applyVelocity", () => {
    it("should change position based on velocity", () => {
      const Ganymede = new Moon("Ganymede", new Vec(3, 3, 3), new Vec(1, 2, 3));
      const Callisto = new Moon(
        "Callisto",
        new Vec(5, 1, 5),
        new Vec(-2, -1, 4)
      );
      applyVelocity([Ganymede, Callisto]);
      expect(Ganymede.pos).toEqual(new Vec(4, 5, 6));
      expect(Callisto.pos).toEqual(new Vec(3, 0, 9));
    });
  });

  describe("stepTimeForward", () => {
    it("should apply gravity and apply velocity", () => {
      const Ganymede = new Moon("Ganymede", new Vec(3, 3, 3), new Vec(0, 0, 0));
      const Callisto = new Moon("Callisto", new Vec(5, 1, 5), new Vec(0, 0, 0));
      stepTimeForward([Ganymede, Callisto]);
      expect(Ganymede.pos).toEqual(new Vec(4, 2, 4));
      expect(Callisto.pos).toEqual(new Vec(4, 2, 4));
    });
  });

  describe("examples", () => {
    it("example 1", () => {
      const A = new Moon("A", new Vec(-1, 0, 2), new Vec(0, 0, 0));
      const B = new Moon("B", new Vec(2, -10, -7), new Vec(0, 0, 0));
      const C = new Moon("C", new Vec(4, -8, 8), new Vec(0, 0, 0));
      const D = new Moon("D", new Vec(3, 5, -1), new Vec(0, 0, 0));
      const moons = [A, B, C, D];
      stepTimeForwardXSteps(10, moons);
      expect(A.pos).toEqual(new Vec(2, 1, -3));
      expect(B.pos).toEqual(new Vec(1, -8, 0));
      expect(C.pos).toEqual(new Vec(3, -6, 1));
      expect(D.pos).toEqual(new Vec(2, 0, 4));
    });

    it("example 2", () => {
      const A = new Moon("A", new Vec(-8, -10, 0), new Vec(0, 0, 0));
      const B = new Moon("B", new Vec(5, 5, 10), new Vec(0, 0, 0));
      const C = new Moon("C", new Vec(2, -7, 3), new Vec(0, 0, 0));
      const D = new Moon("D", new Vec(9, -8, -3), new Vec(0, 0, 0));
      const moons = [A, B, C, D];
      const totalEnergy = stepTimeForwardXSteps(100, moons);
      expect(totalEnergy).toBe(1940);
    });
  });

  describe("puzzle", () => {
    it("puzzle - part 1", () => {
      const A = new Moon("A", new Vec(-9, -1, -1), new Vec(0, 0, 0));
      const B = new Moon("B", new Vec(2, 9, 5), new Vec(0, 0, 0));
      const C = new Moon("C", new Vec(10, 18, -12), new Vec(0, 0, 0));
      const D = new Moon("D", new Vec(-6, 15, -7), new Vec(0, 0, 0));
      const puzzleInput = [A, B, C, D];

      const totalEnergy = stepTimeForwardXSteps(1000, puzzleInput);
      expect(totalEnergy).toBe(12644);
    });

    it("puzzle - part 2", () => {
      const A = new Moon("A", new Vec(-9, -1, -1), new Vec(0, 0, 0));
      const B = new Moon("B", new Vec(2, 9, 5), new Vec(0, 0, 0));
      const C = new Moon("C", new Vec(10, 18, -12), new Vec(0, 0, 0));
      const D = new Moon("D", new Vec(-6, 15, -7), new Vec(0, 0, 0));
      const puzzleInput = [A, B, C, D];

      stepThroughTimeUntilBackToStartState(puzzleInput);
      console.log(puzzleInput);
    });
  });
});
