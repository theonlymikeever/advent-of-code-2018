const data = require('./input');
const formattedData = data.map(points => points.split(', ').map(x => +x));

// Euclidean/Manhattan Dist
const distanceBetween = (point1, point2) => {
  return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
};

// Sorting Fncs
const sortByMin = (a, b) => a - b;
const sortByMax = (a, b) => b - a;

const findMinMaxPoints = input => {
  // min [x1, y1], max [x2, y2]
  const allXPoints = input.map(item => item.x);
  const allYPoints = input.map(item => item.y);
  return {
    min: {
      x: +allXPoints.sort(sortByMin)[0],
      y: +allYPoints.sort(sortByMin)[0]
    },
    max: {
      x: +allXPoints.sort(sortByMax)[0],
      y: +allYPoints.sort(sortByMax)[0]
    }
  };
};

const createAreaMap = input => {
  const coords = input.map(set => {
    return {
      x: +set[0],
      y: +set[1],
      area: []
    };
  });
  const { min, max } = findMinMaxPoints(coords);

  for (let y = min.y; y < max.y; y++) {
    for (let x = min.x; x < max.x; x++) {
      // find dist between coord +  and current position on map
      // sort by closest points
      const areaMap = coords.map((coord) => {
        return {
          x: coord.x,
          y: coord.y,
          distance: distanceBetween(coord, {x, y})
        };
      }).sort((a,b) => a.distance - b.distance);
      // check dist of two closest points and map area
      const [point1, point2] = areaMap;
      if (point1.distance < point2.distance) {
        coords
          .find(crd => crd.x === point1.x && crd.y === point1.y)
          .area.push({ x, y });
      };
    }
  }

  // where points exist inside out min/max (and thus not infinite)
  const points = coords.filter(({ area }) => {
    return area.every(({ x, y }) => x > min.x && x < max.x && y > min.y && y < max.y);
  });
  return points;
};

const largestFiniteArea = areaMap => {
  // sort map, grab first item and return its area length
  const areaSizes = areaMap.map(({ area }) => area.length);
  // TODO: First result is returning too large. Second is our answer
  return Math.max(...areaSizes);
};

const areaMap = createAreaMap(formattedData);

module.exports = {
  findMinMaxPoints,
  distanceBetween,
  formattedData,
  areaMap,
};
// console.log(largestFiniteArea(areaMap));
