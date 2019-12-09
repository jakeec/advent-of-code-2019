export const fn = (input: string) => {
  const digits = input.split("").map(digit => parseInt(digit));
  const levels = chunk(digits, 25);
  const layers = chunk(levels, 6);
  const layerWithLeastZeroes = layerWithLowestNumberOfZeroes(layers);
  const [ones, twos] = countOnesAndTwos(layerWithLeastZeroes);
  return ones * twos;
};

export const finalImage = (input: string) => {
  const digits = input.split("").map(digit => parseInt(digit));
  const levels = chunk(digits, 25);
  const layers = chunk(levels, 6);
  const columns = asColumns(layers);
  let removedTrans = columns.map(level => {
    return level.map(column => {
      return column.filter(digit => digit !== 2);
    });
  });
  const topPixels = removedTrans.map(level => {
    return level.map(column => column[0]);
  });
  console.log(topPixels);
  const merged = topPixels.map(level => level.join("")).join("");
  console.log(merged);
};

export const asColumns = (layers: number[][][]) => {
  let lay = [];
  for (let level = 0; level < layers[0].length; level++) {
    let row = [];
    for (let digit = 0; digit < layers[0][0].length; digit++) {
      let col = [];
      for (let layer = 0; layer < layers.length; layer++) {
        col.push(layers[layer][level][digit]);
      }
      row.push(col);
    }
    lay.push(row);
  }
  return lay;
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
