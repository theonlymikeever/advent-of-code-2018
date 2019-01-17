/* 
  This solution actually solves both parts of Day 10!s

  Process:
    - create an instruction set of each tick (applying velocity to position)
    - analyze whether the height continues to shrink
    - find when height reverts - this is the the moment right after constellation
    - use those instructions to build and fill grid
    - flatten and print grid to display message
 */

const {data, testData} = require('./input');

const ticker = data => {
  return data.map(({position, velocity}) => {
    let x = position[0] + velocity[0];
    let y = position[1] + velocity[1];
    return {
      position: [x, y],
      velocity
    };
  });
};

const findConstellation = data => {
  let found = false;
  let height = Infinity;
  let second = 1;
  let tick = data;
  const previousTicks = [];
  
  while (!found) {
    tick = ticker(tick);
    const yPositions = tick.map(({position}) => position[1]);
    const min = Math.min(...yPositions);
    const max = Math.max(...yPositions);
    const newHeight = Math.abs(min - max);

    /* 
    Essentially we're looking for the cap height of the typeface, by looking for a change
    in height over time. Eventually or stars will shift across the line (backwards),
    which means we just passed the second at which the constellation appeared.
    */
   
    if (newHeight < height) {
      // When the height continues to shrink, we'll push the old set of instructions into the 'cache'
      height = newHeight;
      previousTicks.push(tick);
      second++;
    } else {
      // With constellation time found, we'll pull the previous from our 'cache' of instructions
      found = true;
      second--;
      tick = previousTicks[previousTicks.length - 1];
    }    
  }

  const constellation = {
    tick,
    second
  };

  return constellation;
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
  console.log(`found at ${instructions.second}s!\n`);
  const constellation = flatten(plotGrid(instructions.tick, grid, size));
  return constellation;
};

// Why not, we're already being quite functional *shrug emoji*
const print = constellation => console.log(constellation);

const constellation = createConstellation(data);
print(constellation);

module.exports = {
  print,
  constellation
};
