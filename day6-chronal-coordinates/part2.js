const {
  findMinMaxPoints,
  distanceBetween,
  formattedData: coordinates
} = require('./part1');

const sum = arr => arr.reduce((a, b) => a + b);

const findLargestRegion = input => {
  const coords = input.map(set => {
    return {
      x: +set[0],
      y: +set[1],
      area: []
    };
  });
  const { min, max } = findMinMaxPoints(coords);
  let totalRegion = 0;

  for (let y = min.y; y < max.y; y++) {
    for (let x = min.x; x < max.x; x++) {
      const total = sum(coords.map((coord) => distanceBetween(coord, {x, y})))
      if (total < 10000) totalRegion++;
    }
  }
  return totalRegion;
};

module.exports = findLargestRegion;
// console.log(findLargestRegion(coordinates));
