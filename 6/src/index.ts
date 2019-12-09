import util from "util";

interface Objects {
  [key: string]: string[];
}

export const fn = (input: string[]) => {
  const objects: Objects = {};
  input.forEach(object => {
    const [obj, orbits] = object.split(")");
    if (!objects[obj]) objects[obj] = [orbits];
    else if (objects[obj]) objects[obj].push(orbits);
  });
  const tree = mapToTree("COM", objects, objects["COM"], null);
  return getTotalOrbits(tree, 0);
};

const getTotalOrbits = (initialTree: Tree, initialCount: number) => {
  let total = 0;
  const getOrbitsCount = (tree: Tree, count: number) => {
    total += count;
    if (tree.orbitals.length === 0) return;
    else
      tree.orbitals.forEach(orbital => {
        getOrbitsCount(orbital, count + 1);
      });
  };
  getOrbitsCount(initialTree, initialCount);
  return total;
};

const mapToTree = (
  name: string,
  objects: Objects,
  children: string[],
  parent: Tree | null
): Tree => {
  const tree = new Tree(name, parent);
  if (children && children.length > 0) {
    tree.orbitals = children.map(child => {
      return mapToTree(child, objects, objects[child], tree);
    });
  }
  return tree;
};

class Tree {
  constructor(
    public name: string,
    public parent: Tree | null,
    public orbitals: Tree[] = []
  ) {}
}
