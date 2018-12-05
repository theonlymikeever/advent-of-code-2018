const { input } = require('./input');

// Grid @ 1000x1000 was too small! Says at LEAST 1000
const createGrid = (width = 1000, height = 1000) => {
  // Map out a H x W array
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );
};

const fillGrid = (info, grid) => {
  console.log(`filling claim ${info.claim}`);
  for (let i = 0; i < info.height; i++) {
    for (let x = 0; x < info.width; x++) {
      let currentInfo = grid[i + info.top][x + info.left];
      if (currentInfo.length) {
        currentInfo.push(info.id);
      } else {
        grid[i + info.top][x + info.left] = [info.id];
      }
    }
  }
};

const findSoloClaim = (info, filledGrid) => {
  console.log(`Validating claim ${info.claim}`);
  for (let i = 0; i < info.height; i++) {
    for (let x = 0; x < info.width; x++) {
      let currentInfo = filledGrid[i + info.top][x + info.left];

      if (currentInfo.length > 1) {
        return false;
      }
    }
  }
  return true;
};

// Make sure we're still computing the same area!
const computeFilledArea = grid => {
  return grid.reduce((a, b) => {
    const rowTotal = b.filter(item => item.length >= 2);
    return a + rowTotal.length;
  }, 0);
};

const solution = () => {
  // Initiate paper!!
  let sheetOfPaper = createGrid();
  // fill the sheet
  input.forEach(info => fillGrid(info, sheetOfPaper));
  // find the overlap
  let foundClaim = null,
    idx = 0;
  while (!foundClaim && idx < input.length) {
    let found = findSoloClaim(input[idx], sheetOfPaper);
    if (found) {
      console.log('found at', input[idx]);
      foundClaim = input[idx];
    }
    idx += 1;
  }
  return foundClaim.id;
};

module.exports = solution;
console.log(solution());
