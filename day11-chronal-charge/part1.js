/* 
  Process
    - build grid with coords
    - process grid into PL's
    - crunch through grid, 3x3
    - find largest grouping
*/

const serial = require('./input');
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

const totalPowerLevel = cells => cells.reduce((a, b) => a + b, 0);

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

const processSquare = (powerLevelGrid, topLeftCords) => {
  let powerLevels = [];
  let [topLeftX, topLeftY] = topLeftCords;
  for (let y = topLeftY - 1; y <= topLeftY + 1; y++) {
    for (let x = topLeftX - 1; x <= topLeftX + 1; x++) {
      const pL = powerLevelGrid[y][x];
      powerLevels.push(pL);
    }
  }
  const powerLevel = totalPowerLevel(powerLevels);
  return {
    powerLevel,
    topLeftCords
  };
};

const processPowerLevels = levels => {
  return levels.sort((a, b) => b.powerLevel - a.powerLevel)[0];
};

const processGrid = (grid, maxHeightWidth) => {
  const powerLevelGrid = buildPowerLevelGrid(grid);
  const allSquares = [];

  for (let y = 1; y < maxHeightWidth - 3; y++) {
    for (let x = 1; x < maxHeightWidth - 3; x++) {
      const topLeftCords = [x, y];
      const square = processSquare(powerLevelGrid, topLeftCords);
      allSquares.push(square);
    }
  }

  return processPowerLevels(allSquares);
};

const grid = buildGrid(maxHeightWidth);
const foundSquare = processGrid(grid);
console.log('Part1:', foundSquare);

module.exports = {
  buildGrid,
  processGrid
};
