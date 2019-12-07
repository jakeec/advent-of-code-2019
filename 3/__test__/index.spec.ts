import {
  coord,
  constructCoordsFromInstructions,
  constructLinesFromCoords,
  line,
  getPointOfIntersection,
  findAllPointsOfIntersection,
  closestPointOfIntersection
} from '../src';

describe('Day 0', () => {
  describe('constructCoordsFromInstructions', () => {
    it('should produce ... from R8,U5,L5,D3', () => {
      const input = ['R8', 'U5', 'L5', 'D3'];
      const result = constructCoordsFromInstructions(input);
      expect(result).toEqual([
        coord(8, 0),
        coord(8, 5),
        coord(3, 5),
        coord(3, 2)
      ]);
    });

    describe('constructLinesFromCoords', () => {
      it('should produce some lines', () => {
        const lines = constructLinesFromCoords([
          coord(8, 0),
          coord(8, 5),
          coord(3, 5),
          coord(3, 2)
        ]);
        expect(lines).toEqual([
          line(coord(0, 0), coord(8, 0)),
          line(coord(8, 0), coord(8, 5)),
          line(coord(8, 5), coord(3, 5)),
          line(coord(3, 5), coord(3, 2))
        ]);
      });
    });

    describe('getPointOfIntersection', () => {
      it('should return false if lines are parallel horizontally', () => {
        const intersection = getPointOfIntersection(
          line(coord(0, 0), coord(8, 0)),
          line(coord(8, 2), coord(10, 2))
        );
        expect(intersection).toBe(false);
      });

      it('should return false if lines are parallel vertically', () => {
        const intersection = getPointOfIntersection(
          line(coord(2, 0), coord(2, 10)),
          line(coord(8, 2), coord(8, 16))
        );
        expect(intersection).toBe(false);
      });

      it("should return false if lines don't intersect", () => {
        const intersection = getPointOfIntersection(
          line(coord(2, 0), coord(2, 4)),
          line(coord(0, 4), coord(8, 4))
        );
        expect(intersection).toBe(false);
      });

      it('should return point of intersection if lines intersect - first line horizontal', () => {
        const intersection = getPointOfIntersection(
          line(coord(3, 3), coord(10, 3)),
          line(coord(5, 1), coord(5, 10))
        );
        expect(intersection).toEqual(coord(5, 3));
      });

      it('should return point of intersection if lines intersect - first line vertical', () => {
        const intersection = getPointOfIntersection(
          line(coord(5, 1), coord(5, 10)),
          line(coord(3, 3), coord(10, 3))
        );
        expect(intersection).toEqual(coord(5, 3));
      });
    });

    describe('findAllLinesOfIntersection', () => {
      it('should find the points of intersections for two wires', () => {
        const result = findAllPointsOfIntersection(
          ['R8', 'U5', 'L5', 'D3'],
          ['U7', 'R6', 'D4', 'L4']
        );
        expect(result).toEqual([coord(6, 5), coord(3, 3)]);
      });
    });

    describe('closestPointOfIntersection', () => {
      it('find the distance from origin of closest point of intersection', () => {
        const points = findAllPointsOfIntersection(
          ['R8', 'U5', 'L5', 'D3'],
          ['U7', 'R6', 'D4', 'L4']
        );
        const result = closestPointOfIntersection(coord(0, 0), points);
        expect(result).toEqual(6);
      });

      it('find the distance from origin of closest point of intersection', () => {
        const points = findAllPointsOfIntersection(
          ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
          ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
        );
        const result = closestPointOfIntersection(coord(0, 0), points);
        expect(result).toEqual(159);
      });

      it('find the distance from origin of closest point of intersection', () => {
        const points = findAllPointsOfIntersection(
          [
            'R98',
            'U47',
            'R26',
            'D63',
            'R33',
            'U87',
            'L62',
            'D20',
            'R33',
            'U53',
            'R51'
          ],
          ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7']
        );
        const result = closestPointOfIntersection(coord(0, 0), points);
        expect(result).toEqual(135);
      });
    });
  });
});
