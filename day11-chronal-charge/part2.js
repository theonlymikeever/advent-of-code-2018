// This modified part 1 solution works, but it's quite slow. Needs to be optimized!

// const serial = require('./input');
const serial = 18
const maxHeightWidth = 300;

const findPowerLevel = (cell, serial) => {
  const [x, y] = cell;
  let powerLevel = 0;
  const rackId = x + 10;

  powerLevel = rackId * y;
  powerLevel += serial;
  powerLevel *= rackId;

  const hundredsDigit = Math.floor((powerLevel / 100) % 10);
  powerLevel = hundredsDigit - 5;

  return powerLevel;
};

const buildGrid = maxHeightWidth => {
  return Array.from({ length: maxHeightWidth }, () => {
    return Array.from({ length: maxHeightWidth }, (_, i) => i + 1);
  });
};

const buildPowerLevelGrid = grid => {
  return grid.map((row, i) => {
    return row.map(cell => findPowerLevel([cell, i + 1], serial));
  });
};

const processSquare = (grid, topLeftCords, squareSize) => {
  let powerLevel = 0;
  let [topLeftX, topLeftY] = topLeftCords;
  for (let y = topLeftY - 1; y < Math.abs(topLeftY + squareSize - 1); y++) {
    for (let x = topLeftX - 1; x < Math.abs(topLeftX + squareSize - 1); x++) {
      const pL = grid[y][x];
      powerLevel += pL;
    }
  }
  return {
    powerLevel,
    topLeftCords
  };
};

const processGrid = (grid, squareSize) => {
  let largestPL = 0;
  let cords = null;
  for (let y = 1; y < grid.length - squareSize; y++) {
    for (let x = 1; x < grid.length - squareSize; x++) {
      const topLeftCords = [x, y];
      const square = processSquare(grid, topLeftCords, squareSize);
      if (square.powerLevel > largestPL) {
        largestPL = square.powerLevel;
        cords = square.topLeftCords;
      }
    }
  }

  return {
    powerLevel: largestPL,
    topLeftCords: cords
  };
};

const findLargestSquare = grid => {
  let largestPL = 0;
  let result = {};
  for (let squareSize = 1; squareSize <= 300; squareSize++) {
    console.log('squaresize', squareSize)
    const {powerLevel, topLeftCords } = processGrid(grid, squareSize);
    if (powerLevel > largestPL) {
      largestPL = powerLevel;
      result = {
        powerLevel,
        squareSize,
        topLeftCords
      };
    }
  }
  return result;
}

const grid = buildGrid(maxHeightWidth);
const powerLevelGrid = buildPowerLevelGrid(grid);
const largestSquare = findLargestSquare(powerLevelGrid);
console.log('Part2:', largestSquare);

module.exports = {
  buildGrid,
  buildPowerLevelGrid,
  findLargestSquare
};
