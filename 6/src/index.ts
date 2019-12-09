import util from 'util';

interface Objects {
  [key: string]: string[];
}

const createObjectMap = (input: string[]) => {
  const objects: Objects = {};
  input.forEach(object => {
    const [obj, orbits] = object.split(')');
    if (!objects[obj]) objects[obj] = [orbits];
    else if (objects[obj]) objects[obj].push(orbits);
  });
  return objects;
};

export const totalOrbits = (input: string[]) => {
  const objects = createObjectMap(input);
  const tree = mapToTree('COM', objects, objects['COM'], null);
  return getTotalOrbits(tree, 0);
};

export const orbitalTransfers = (
  input: string[],
  start: string,
  goal: string
) => {
  const objects: Objects = createObjectMap(input);
  const tree = mapToTree('COM', objects, objects['COM'], null);
  const you = dfs()(tree, start);
  console.log(you);
  const san = dfs()(tree, goal);
  if (you && san) {
    return findNumberOfJumps(you, san);
  } else return false;
};

const findNumberOfJumps = (start: Tree, goal: Tree) => {
  const startAncestors: string[] = [];
  const goalAncestors: string[] = [];
  let match: string | false = false;
  const startStack: Tree[] = [];
  const goalStack: Tree[] = [];
  startStack.push(start);
  goalStack.push(goal);

  while (startStack.length > 0 || goalStack.length > 0) {
    let startCurrent = startStack.pop();
    let goalCurrent = goalStack.pop();
    if (startCurrent && startCurrent.parent)
      startAncestors.push(startCurrent.parent.name);
    if (goalCurrent && goalCurrent.parent)
      goalAncestors.push(goalCurrent.parent.name);
    const matched = startAncestors.filter(ancestor =>
      goalAncestors.includes(ancestor)
    );
    if (matched.length > 0) {
      match = matched[0];
    } else {
      if (startCurrent && startCurrent.parent)
        startStack.push(startCurrent.parent);
      if (goalCurrent && goalCurrent.parent) goalStack.push(goalCurrent.parent);
    }
  }
  if (match) {
    const startCount = startAncestors
      .join(',')
      .split(',' + match)[0]
      .split(',').length;
    const goalCount = goalAncestors
      .join(',')
      .split(',' + match)[0]
      .split(',').length;
    return startCount + goalCount;
  }

  console.log(startAncestors.toString());
  console.log(startAncestors);

  return match;
};

const dfs = () => {
  const stack: Tree[] = [];
  const visited: string[] = [];
  return (tree: Tree, name: string): Tree | false => {
    let match: Tree | false = false;
    stack.push(tree);
    while (stack.length > 0) {
      let current = stack.pop();
      if (!current) {
        match = false;
        break;
      }
      if (current.name === name) {
        match = current;
        break;
      }
      if (!visited.includes(current.name)) {
        visited.push(current.name);
        current.orbitals.forEach(orbital => stack.push(orbital));
      }
    }
    return match;
  };
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
