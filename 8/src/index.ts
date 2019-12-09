export const fn = (input: string) => {
  const digits = input.split("").map(digit => parseInt(digit));
  const levels = chunk(digits, 25);
  const layers = chunk(levels, 6);
  const layerWithLeastZeroes = layerWithLowestNumberOfZeroes(layers);
  const [ones, twos] = countOnesAndTwos(layerWithLeastZeroes);
  return ones * twos;
};

const chunk = <T>(array: T[], size: number) => {
  const chunks: T[][] = [];
  let chunk: T[] = [];
  array.forEach((v, i) => {
    chunk.push(v);
    if ((i + 1) % size === 0) {
      chunks.push(chunk);
      chunk = [];
    }
  });
  return chunks;
};

const layerWithLowestNumberOfZeroes = (layers: number[][][]) => {
  let layerWithLeastZeroes: number[][] = [];
  let lowestNumberOfZeroes: number;
  layers.forEach(layer => {
    let numberOfZeroesInLayer = 0;
    layer.forEach(level => {
      numberOfZeroesInLayer += countZeroes(level);
    });
    if (!lowestNumberOfZeroes) lowestNumberOfZeroes = numberOfZeroesInLayer;
    if (numberOfZeroesInLayer < lowestNumberOfZeroes) {
      lowestNumberOfZeroes = numberOfZeroesInLayer;
      layerWithLeastZeroes = layer;
    }
  });
  return layerWithLeastZeroes;
};

const countZeroes = (array: number[]) => {
  return array.filter(i => i === 0).length;
};

const countOnesAndTwos = (layer: number[][]) => {
  let ones = 0;
  let twos = 0;
  layer.forEach(level => {
    ones += level.filter(i => i === 1).length;
    twos += level.filter(i => i === 2).length;
  });
  return [ones, twos];
};
