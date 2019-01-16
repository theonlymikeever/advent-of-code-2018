/* 
  create a map of each tick
  run through the map
  find grid size
  search for height change
  find perfect second
  build and fill grid
  flatten and print map
 */

const {data, testData} = require('./input');

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

const findConstellation = data => {
  let found = false;
  let height = Infinity;
  let second = 0;
  let tick = data;
  let previousTick;
  
  while (!found) {
    second++;
    tick = tick.map(({position, velocity}) => {
      let x = position[0] += velocity[0];
      let y = position[1] += velocity[1];
      return {
        position: [x, y],
        velocity
      };
    });

    const yPositions = tick.map(({position}) => position[1]);
    const min = Math.min(...yPositions);
    const max = Math.max(...yPositions);

    let newHeight = Math.abs(min - max);

    if (newHeight < height) {
      height = newHeight;
      // previousTick = tick;
    } else {      
      found = true;
    }
  }

  // should cache the previous step?
  tick = tick.map(({position, velocity}) => {
    let x = position[0] -= velocity[0];
    let y = position[1] -= velocity[1];
    return {
      position: [x, y],
      velocity
    };
  });

  const constellation = {
    tick,
    second: second - 1
  };

  return constellation;
};

const plotGrid = (points, grid, {minX, minY}) => {
  points.forEach((star) => {
    grid[star.position[1] - minY][star.position[0] - minX] = '#';
  });
  return grid;
};

const flatten = grid => grid.map((i) => i.join('')).join('\n');

const createConstellation = data => {
  const instructions = findConstellation(data);
  const size = findGridSize(instructions.tick);
  const grid = buildGrid(size);
  console.log(instructions);
  const constellation = flatten(plotGrid(instructions.tick, grid, size));
  return constellation;
};

console.log(createConstellation(data));
