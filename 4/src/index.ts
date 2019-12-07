export const findPasswords = (min: number, max: number) => {
  const passwords = [];
  for (let i = min + 1; i < max; i++) {
    if (isValid2(i)) passwords.push(i);
  }
  return passwords;
};

export const isValid = (password: number) => {
  const length = password.toString().length === 6;
  let adjacent = false;
  let neverDecreases = true;
  password
    .toString()
    .split('')
    .forEach((v, i, a) => {
      if (a[i - 1]) {
        if (v === a[i - 1]) adjacent = true;
        if (a[i - 1] > v) neverDecreases = false;
      }
    });
  return length && adjacent && neverDecreases;
};

interface AdjacentNumbers {
  [key: string]: number;
}

export const isValid2 = (password: number) => {
  const length = password.toString().length === 6;
  let adjacent = false;
  let neverDecreases = true;
  const adjacentNumbers: AdjacentNumbers = {};
  password
    .toString()
    .split('')
    .forEach((v, i, a) => {
      if (!adjacentNumbers[v]) adjacentNumbers[v] = 0;
      adjacentNumbers[v]++;
      if (a[i - 1]) {
        if (a[i - 1] > v) neverDecreases = false;
      }
    });
  Object.keys(adjacentNumbers).forEach(k => {
    if (adjacentNumbers[k] === 2) adjacent = true;
  });
  return length && adjacent && neverDecreases;
};

const validPasswords = findPasswords(193651, 649729);
console.log(validPasswords.length);
