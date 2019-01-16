const {data, testData} = require('./input');

const smallToBig = (a, b) => a - b;

const ticker = (data, seconds = 1) => {
  const tick = input => {
    return input.map(({position, velocity}) => {
      let x = position[0] + velocity[0];
      let y = position[1] + velocity[1];
      return {
        position: [x, y],
        velocity
      };
    });
  };

  let results = data;

  for (let i = 0; i < seconds; i++) {
    results = tick(results);
  }
  return results;
};

const findGridSize = input => {
  const positions = {
    x: [],
    y: []
  };

  input.forEach(({position}) => {
    positions.x.push(position[0]);
    positions.y.push(position[1]);
  });

  const size = {
    minX: Math.min(...positions.x),
    maxX: Math.max(...positions.x),
    minY: Math.min(...positions.y),
    maxY: Math.max(...positions.y),
  };

  return size;
};

const buildGrid = ({minX, maxX, minY, maxY}) => {
  const vertical = Math.abs(minY - maxY) + 1;
  const horizontal = Math.abs(minX - maxX) + 1;
  const filler = () => '.';

  return Array.from({ length: vertical }, () => {
    return Array.from({ length: horizontal }, filler);
  });
};

const flatten = grid => grid.map((i) => i.join('')).join('\n');

const size = findGridSize(testData);
const grid = buildGrid(size);
const sky = flatten(grid);

/* 
  // create a map of each tick
  run through the map and flatten and print map
 */

// const tick = ticker(testData, 3);
// console.log(tick);